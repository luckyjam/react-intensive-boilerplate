// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import homer from '../../theme/assets/homer.png';

export default class Composer extends Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired
    };

    render () {
        const { firstName } = this.props;

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
