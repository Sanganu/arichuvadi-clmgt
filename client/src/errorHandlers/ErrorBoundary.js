import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../reduxAction/dispatchLoginCredentials';

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', this.props.scope || 'app', error, info);
    if (error && /Loading chunk \d+ failed/i.test(error.message)) {
      window.location.reload();
    }
  }

  handleRetry = () => this.setState({ error: null });

  handleSignOut = () => {
    this.props.logout();
    window.location.replace('/');
  };

  render() {
    const { error } = this.state;
    const { children, fallback, scope } = this.props;

    if (!error) return children;

    if (typeof fallback === 'function') {
      return fallback({
        error,
        retry: this.handleRetry,
        signOut: this.handleSignOut,
      });
    }

    return (
      <div className="container middlecontent" role="alert" data-testid="error-boundary">
        <h4>Something went wrong{scope ? ` in ${scope}` : ''}.</h4>
        <p className="errmsg">{error.message}</p>
        <button className="createbutton" onClick={this.handleRetry}>Try again</button>
        <button
          className="createbutton"
          style={{ marginLeft: 8 }}
          onClick={this.handleSignOut}
        >
          Sign out
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(ErrorBoundary);