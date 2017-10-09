// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.scss';

export default class Spinner extends Component {
    constructor () {
        super();
        this.spin = ::this._spin;
        this.portalTarget = document.getElementById('portal');
    }

    state = {
        loading: 'Loading'
    };

    componentWillMount () {
        this.spinning = setInterval(() => this.spin(), 1000);
    }

    componentWillUnmount () {
        clearInterval(this.spinning);
    }

    _spin () {
        const { loading } = this.state;

        if (loading.length >= 10) {
            this.setState({
                loading: 'Loading'
            });

            return;
        }

        this.setState({
            loading: `${loading}.`
        });
    }

    render () {
        const { loading } = this.state;

        return createPortal(
            <section className = { Styles.spinner }>{loading}</section>,
            this.portalTarget
        );
    }
}
