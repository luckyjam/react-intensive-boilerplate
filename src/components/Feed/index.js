// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

// Components
import Composer from '../Composer';
import Post from '../Post';

export default class Feed extends Component {
    static propTypes = {
        lastName:  PropTypes.string.isRequired
    };

    render () {
        const { lastName } = this.props;

        return (
            <section className = { Styles.feed }>
                <Composer />
                <Post lastName = { lastName } />
            </section>
        );
    }
}
