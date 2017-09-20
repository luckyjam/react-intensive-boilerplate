// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

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

    shouldComponentUpdate (nextProps) {
        return nextProps.message !== this.props.message;
    }

    render () {
        const { firstName, lastName, avatar } = this.context;
        const { message } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {moment().format('MMMM D h:mm:ss a')}
                </a>
                <p className = { Styles.message }>
                    {message}
                </p>
            </section>
        );
    }
}
