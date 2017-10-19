// Core
import React, { Component } from 'react';

// Instruments
import avatar from '../../theme/assets/avatar.jpg';
import Styles from './styles.scss';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class Post extends Component {
    static contextTypes = {
        firstName: PropTypes.string.isRequired
    };

    static propTypes = {
        lastName:  PropTypes.string.isRequired
    };

    render () {
        const { firstName } = this.context;
        const { lastName } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>
                    {`${firstName} ${lastName}`}
                </a>
                <a className = { Styles.time }>
                    {moment().format('MMMM D h:mm:ss a')}
                </a>
                <p className = { Styles.message }>
                    Comment!
                </p>
            </section>
        );
    }
}
