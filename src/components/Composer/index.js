// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getUniqueID, getRandomColor } from '../../helpers';
import moment from 'moment';

export default class Composer extends Component {
    static contextTypes = {
        firstName: PropTypes.string.isRequired,
        avatar:    PropTypes.string.isRequired
    };

    static propTypes = {
        createPost: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextAreaChange = ::this._handleTextAreaChange;
        this.handleTextAreaCopy = ::this._handleTextAreaCopy;
        this.handleKeyPress = ::this._handleKeyPress;
    }

    state = {
        textAreaValue:     '',
        avatarBorderColor: '#000'
    };

    _handleKeyPress () {
        this.setState(() => ({
            avatarBorderColor: getRandomColor()
        }));
    }

    _handleSubmit (event) {
        event.preventDefault();

        const { textAreaValue } = this.state;

        if (!textAreaValue) {
            return;
        }

        this.props.createPost({
            _id:     getUniqueID(15),
            comment: textAreaValue,
            created: moment().unix()
        });

        this.setState(() => ({
            textAreaValue: ''
        }));
    }

    _handleTextAreaChange (event) {
        const textAreaValue = event.target.value;

        this.setState(() => ({
            textAreaValue
        }));
    }

    _handleTextAreaCopy (event) {
        event.preventDefault();
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
                        borderColor: avatarBorderColor
                    } }
                />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}...` }
                        value = { textAreaValue }
                        onChange = { this.handleTextAreaChange }
                        onCopy = { this.handleTextAreaCopy }
                        onKeyPress = { this.handleKeyPress }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
