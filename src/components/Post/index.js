// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getFullName } from '../../helpers';
import moment from 'moment';

export default class Post extends Component {
    static propTypes = {
        _id:        PropTypes.string.isRequired,
        avatar:     PropTypes.string.isRequired,
        comment:    PropTypes.string.isRequired,
        created:    PropTypes.number.isRequired,
        deletePost: PropTypes.func.isRequired,
        firstName:  PropTypes.string.isRequired,
        lastName:   PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.deletePost = ::this._deletePost;
    }

    shouldComponentUpdate (nextProps) {
        return nextProps._id !== this.props._id;
    }

    _deletePost () {
        this.props.deletePost(this.props._id);
    }

    render () {
        const { avatar, comment, created, firstName, lastName } = this.props;

        const isAbleToDelete = (
            <span className = { Styles.cross } onClick = { this.deletePost } />
        );

        return (
            <section className = { Styles.post }>
                {isAbleToDelete}
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>
                    {getFullName(firstName, lastName)}
                </a>
                <a className = { Styles.time }>
                    {moment.unix(created).format('MMMM D h:mm:ss a')}
                </a>
                <p className = { Styles.comment }>{comment}</p>
            </section>
        );
    }
}
