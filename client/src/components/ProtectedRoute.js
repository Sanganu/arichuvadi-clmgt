import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';

/**
 * Role based access - restricting control to different components based on board / student
 *
 * Props:
 *   role        string | string[]   Required role(s). Omit = auth-only.
 *                                   Example: "management" or ["management","student"]
 *   component   ComponentType       Component to render when access granted.
 *   render      function            Alternative to `component` (gets routeProps).
 *   children    ReactNode           Alternative to `component` / `render`.
 *   ...rest     forwarded to <Route> (path, exact, strict, sensitive, etc.)
 *
 * Redux state consumed (from loginReducer):
 *   invalid       boolean   true = not authenticated
 *   usertype      string    e.g. "management" | "student"
 *   bootstrapped  boolean   true after App's session probe finished
 *
 * Behaviour:
 *   1. Bootstrap in flight       → render <Loading />  (avoids a flash-redirect)
 *   2. Not authenticated         → redirect to role-specific login
 *   3. Authenticated, wrong role → redirect to "/" (Homepage)
 *   4. Authenticated, role OK    → render the target component
 */

class ProtectedRoute extends Component {
  resolveLoginPath = () => {
    const { role } = this.props;
    const roles = Array.isArray(role) ? role : role ? [role] : [];

    // Student-only route → student login. Anything else → board login.
    if (roles.includes('student') && !roles.includes('management')) {
      return '/student/loginpg';
    }
    return '/board/login';
  };

  isRoleAllowed = () => {
    const { role, usertype } = this.props;
    if (!role) return true;                                   // auth-only
    if (Array.isArray(role)) return role.includes(usertype);
    return usertype === role;
  };

  renderAllowed = (routeProps) => {
    const { component: C, render, children } = this.props;
    if (C) return <C {...routeProps} />;
    if (typeof render === 'function') return render(routeProps);
    return children || null;
  };

  render() {
    const {
      bootstrapped,
      invalid,
      // strip internal props so they don't leak onto <Route>
      role,           // eslint-disable-line no-unused-vars
      usertype,       // eslint-disable-line no-unused-vars
      component,      // eslint-disable-line no-unused-vars
      render,         // eslint-disable-line no-unused-vars
      children,       // eslint-disable-line no-unused-vars
      dispatch,       // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(routeProps) => {
          // 1. Still validating session cookie
          if (!bootstrapped) {
            return (
              <Loading
                message="Checking your session…"
                testid="protected-bootstrapping"
              />
            );
          }

          // 2. Not authenticated → role-specific login
          if (invalid) {
            return (
              <Redirect
                to={{
                  pathname: this.resolveLoginPath(),
                  state: { from: routeProps.location },
                }}
              />
            );
          }

          // 3. Authenticated but wrong role
          if (!this.isRoleAllowed()) {
            return (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: routeProps.location, reason: 'role-mismatch' },
                }}
              />
            );
          }

          // 4. All good
          return this.renderAllowed(routeProps);
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  invalid: state.invalid,
  usertype: state.usertype,
  bootstrapped: state.bootstrapped,
});

export default connect(mapStateToProps)(ProtectedRoute);
