// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import homer from '../../theme/assets/homer.png';
import PropTypes from 'prop-types';

export default class Composer extends Component {
    static contextTypes = {
        firstName: PropTypes.string.isRequired
    };

    render () {
        const { firstName } = this.context;

        return (
            <section className = { Styles.composer }>
                <img alt = 'commenter' src = { homer } />
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
