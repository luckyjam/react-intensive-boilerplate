// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getUniqueID, getRandomColor } from '../../helpers';
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
        this.handleTextAreaCopy = ::this._handleTextAreaCopy;
        this.handleKeyPress = ::this._handleKeyPress;
    }

    state = {
        textAreaValue:     '',
        avatarBorderColor: '#90949C'
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

    _handleTextAreaCopy (event) {
        event.preventDefault();
    }

    _handleKeyPress () {
        this.setState({
            avatarBorderColor: getRandomColor()
        });
    }

    render () {
        const { firstName, avatar } = this.context;
        const { textAreaValue, avatarBorderColor } = this.state;

        return (
            <section className = { Styles.composer }>
                <img
                    alt = 'commenter'
                    src = { avatar }
                    style = { {
                        borderColor: `${avatarBorderColor}`
                    } }
                />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                        value = { textAreaValue }
                        onChange = { this.handleTextAreaMutation }
                        onCopy = { this.handleTextAreaCopy }
                        onKeyPress = { this.handleKeyPress }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
