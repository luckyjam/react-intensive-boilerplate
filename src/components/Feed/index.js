// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class Feed extends Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    render () {
        const { firstName, lastName } = this.props;

        return (
            <section className = { Styles.feed }>
                <Composer firstName = { firstName } lastName = { lastName } />
                <Post firstName = { firstName } lastName = { lastName } />
            </section>
        );
    }
}
