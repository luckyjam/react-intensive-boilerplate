// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import moment from 'moment';
import { string, number, func, array } from 'prop-types';

// Components
import Like from '../Like';

export default class Post extends Component {
    static propTypes = {
        _id:        string.isRequired,
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        firstName:  string.isRequired,
        lastName:   string.isRequired,
        likePost:   func.isRequired,
        likes:      array.isRequired
    };

    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    constructor () {
        super();

        this.deletePost = ::this._deletePost;
    }

    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    _deletePost () {
        const { deletePost, _id } = this.props;

        deletePost(_id);
    }

    render () {
        const {
            firstName,
            lastName,
            avatar,
            comment,
            created,
            _id,
            likePost,
            likes
        } = this.props;
        const { firstName: ownFirstName, lastName: ownLastName } = this.context;

        const isAbleToDelete =
            `${ownFirstName} ${ownLastName}` === `${firstName} ${lastName}` ? (
                <span className = { Styles.cross } onClick = { this.deletePost } />
            ) : null;

        const liked = likes.some((like) => like.firstName === ownFirstName);

        return (
            <section className = { Styles.post }>
                {isAbleToDelete}
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {moment.unix(created).format('MMMM D h:mm:ss a')}
                </a>
                <p className = { Styles.message }>{comment}</p>
                <Like
                    _id = { _id }
                    liked = { liked }
                    likePost = { likePost }
                    likes = { likes }
                />
            </section>
        );
    }
}
