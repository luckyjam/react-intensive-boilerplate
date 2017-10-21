// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import moment from 'moment';
import { string, number } from 'prop-types';

export default class Post extends Component {
    static propTypes = {
        avatar:    string.isRequired,
        comment:   string.isRequired,
        created:   number.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static defaultProps = {
        avatar:    '',
        firstName: 'noname',
        lastName:  'noname'
    };

    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    render () {
        const { firstName, lastName, avatar, comment, created } = this.props;

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
                <p className = { Styles.message }>{comment}</p>
            </section>
        );
    }
}
