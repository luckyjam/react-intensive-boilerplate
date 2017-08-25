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
        increasePostsCount: PropTypes.func.isRequired,
        message:            PropTypes.string.isRequired
    };

    componentWillMount () {
        this.props.increasePostsCount();
    }

    render () {
        const { firstName, lastName, avatar } = this.context;
        const { message } = this.props;

        return (
            <section className = { Styles.post }>
                <span />
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
