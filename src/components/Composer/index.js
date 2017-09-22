// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getUniqueID, getRandomColor } from '../../helpers';

export default class Composer extends Component {
    static contextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired
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
        textAreaValue: '',
        color:         '#000'
    };

    _handleTextAreaMutation (event) {
        this.setState({
            textAreaValue: event.target.value
        });
    }

    _handleSubmit (event) {
        event.preventDefault();

        const { textAreaValue } = this.state;

        if (!textAreaValue) {
            return;
        }

        this.props.createPost({
            comment: textAreaValue,
            _id:     getUniqueID(15)
        });

        this.setState({
            textAreaValue: ''
        });
    }

    _handleTextAreaCopy (event) {
        event.preventDefault();
        alert(
            'This content is copyright protected. It is restricted from copying.'
        );
    }

    _handleKeyPress () {
        this.setState({
            color: getRandomColor()
        });
    }

    render () {
        const { firstName, avatar } = this.context;
        const { textAreaValue } = this.state;

        return (
            <section className = { Styles.composer }>
                {' '}
                <img alt = 'commenter' src = { avatar } />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                        style = { {
                            color: this.state.color
                        } }
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
