// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

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

    _handleSubmit (event) {
        event.preventDefault();
        this.props.createPost();
    }

    _handleTextAreaMutation (event) {
        this.setState({
            textAreaValue: event.target.value
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
