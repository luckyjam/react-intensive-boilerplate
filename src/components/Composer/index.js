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

    render () {
        const { firstName, avatar } = this.context;

        return (
            <section className = { Styles.composer }>
                <img alt = 'commenter' src = { avatar } />
                <form>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
