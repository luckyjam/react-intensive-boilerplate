// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

export default class Postman extends Component {
    static contextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired
    };

    render () {
        const { avatar, firstName } = this.context;

        return (
            <section className = { Styles.postman }>
                <img src = { avatar } />
                <span>
                    Welcome online, {firstName}!
                </span>
            </section>
        );
    }
}
