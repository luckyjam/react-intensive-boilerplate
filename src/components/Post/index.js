// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getCurrentTime } from '../../helpers';

export default class Post extends Component {
    static propTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    render () {
        const { firstName, lastName, avatar } = this.props;

        return (
            <section className = { Styles.post }>
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {getCurrentTime()}
                </a>
                <p className = { Styles.message }>I fell perfect!</p>
            </section>
        );
    }
}
