// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import homer from '../../theme/assets/homer.png';
import PropTypes from 'prop-types';
import { getCurrentTime } from '../../helpers';

export default class Post extends Component {
    static propTypes = {
        lastName: PropTypes.string.isRequired
    };

    static contextTypes = {
        firstName: PropTypes.string.isRequired
    };

    render () {
        const { lastName } = this.props;
        const { firstName } = this.context;

        return (
            <section className = { Styles.post }>
                <a>
                    <img alt = 'commenter' src = { homer } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {getCurrentTime()}
                </a>
                <p className = { Styles.message }>It is donuts time! Doh!</p>
            </section>
        );
    }
}
