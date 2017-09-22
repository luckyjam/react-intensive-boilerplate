// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getUniqueID } from '../../helpers';
import moment from 'moment';

export default class Composer extends Component {
    static contextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    static propTypes = {
        createPost: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextAreaMutation = ::this._handleTextAreaMutation;
    }

    state = {
        textAreaValue: ''
    };

    _handleTextAreaMutation (event) {
        this.setState({
            textAreaValue: event.target.value
        });
    }

    _handleSubmit (event) {
        event.preventDefault();

        const { textAreaValue } = this.state;
        const { firstName, lastName, avatar } = this.context;

        if (!textAreaValue) {
            return;
        }

        this.props.createPost({
            _id:     getUniqueID(15),
            comment: textAreaValue,
            created: moment().unix(),
            firstName,
            lastName,
            avatar
        });

        this.setState({
            textAreaValue: ''
        });
    }

    render () {
        const { firstName, avatar } = this.context;
        const { textAreaValue } = this.state;

        return (
            <section className = { Styles.composer }>
                <img alt = 'commenter' src = { avatar } />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                        value = { textAreaValue }
                        onChange = { this.handleTextAreaMutation }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
