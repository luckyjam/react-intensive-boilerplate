// Core
import React, { Component } from 'react';

// Instruments
import homer from '../../theme/assets/homer.png';
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getCurrentTime } from '../../helpers';

export default class Post extends Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    render () {
        const { firstName, lastName } = this.props;

        return (
            <section className = { Styles.post }>
                <a>
                    <img alt = 'commenter' src = { homer } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {getCurrentTime()}
                </a>
                <p className = { Styles.message }>I fell perfect!</p>
            </section>
        );
    }
}
