// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Post extends Component {
    static propTypes = {
        _id:       PropTypes.string.isRequired,
        avatar:    PropTypes.string.isRequired,
        comment:   PropTypes.string.isRequired,
        created:   PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    shouldComponentUpdate (nextProps) {

        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    render () {
        const { avatar, comment, created, firstName, lastName } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {moment.unix(created).format('MMMM D h:mm:ss a')}
                </a>
                <p className = { Styles.comment }>{comment}</p>
            </section>
        );
    }
}
