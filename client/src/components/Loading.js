import React, { Component } from 'react';

/**
 * Reusable Loading component.
 *
 * Props (all optional):
 *   message   string  - text shown under the spinner (default "Loading…")
 *   size      'sm' | 'md' | 'lg'   (default 'md')
 *   fullPage  boolean - center vertically on the viewport instead of inline
 *   testid    string  - data-testid for automation (default 'loading')
 *
 * Usage:
 *   <Loading />                                   // inline, default text
 *   <Loading message="Signing you in…" />         // custom text
 *   <Loading fullPage size="lg" />                // full-viewport overlay
 *   <Suspense fallback={<Loading message="Loading page…" />}>...</Suspense>
 */
class Loading extends Component {
  static defaultProps = {
    message: 'Loading…',
    size: 'md',
    fullPage: false,
    testid: 'loading',
  };

  render() {
    const { message, size, fullPage, testid } = this.props;

    const sizePx = size === 'sm' ? 20 : size === 'lg' ? 56 : 36;

    const wrapperStyle = fullPage
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.85)',
          zIndex: 9999,
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          minHeight: 120,
        };

    const spinnerStyle = {
      width: sizePx,
      height: sizePx,
      border: `${Math.max(2, sizePx / 10)}px solid #e3e3e3`,
      borderTopColor: '#2a6df4',
      borderRadius: '50%',
      animation: 'arichuvadi-spin 0.9s linear infinite',
    };

    const textStyle = {
      marginTop: '0.75rem',
      fontSize: size === 'sm' ? 13 : 15,
      color: '#555',
    };

    return (
      <div role="status" aria-live="polite" data-testid={testid} style={wrapperStyle}>
        {/* inline keyframes so this works without touching global CSS */}
        <style>{`
          @keyframes arichuvadi-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
        <div style={spinnerStyle} aria-hidden="true" />
        {message ? <span style={textStyle}>{message}</span> : null}
        <span style={{ position: 'absolute', left: -9999 }}>{message}</span>
      </div>
    );
  }
}

export default Loading;
