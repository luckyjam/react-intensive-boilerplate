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
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    render () {
        const { firstName, lastName, avatar } = this.props;

        return (
            <section className = { Styles.feed }>
                <Composer
                    avatar = { avatar }
                    firstName = { firstName }
                    lastName = { lastName }
                />
                <Post
                    avatar = { avatar }
                    firstName = { firstName }
                    lastName = { lastName }
                />
            </section>
        );
    }
}
