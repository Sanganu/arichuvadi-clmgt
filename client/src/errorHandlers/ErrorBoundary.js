import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutAction } from "../reduxAction/dispatchLoginCredentials";


class ErrorBoundary extends Component{
    state = {
        error: null,
        info: null
    };

    static getDerivedStateFromError(error){
        return { error}
    }

    componentDidCatch(error,info){
        console.error(`[ErrorBoundary]`,this.props.scope || 'app',error,info );
        this.setState({info});

        if(error && /Loading chunk \d+ failed/i.test(error.message)){
            window.location.reload()
        }
    }
}