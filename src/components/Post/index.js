// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getCurrentTime } from '../../helpers';

export default class Post extends Component {
    static contextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    static propTypes = {
        message: PropTypes.string.isRequired
    };

    componentWillMount () {
        console.log(`Компонент маунтиться в DOM браузера.
А значит, с эти событием можно настроить некоторый функционал...`);
    }

    shouldComponentUpdate (nextProps) {
        return nextProps.message !== this.props.message;
    }

    render () {
        const { firstName, lastName, avatar } = this.context;
        const { message } = this.props;

        return (
            <section className = { Styles.post }>
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {getCurrentTime()}
                </a>
                <p className = { Styles.message }>
                    {message}
                </p>
            </section>
        );
    }
}
