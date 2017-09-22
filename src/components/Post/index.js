// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getFullName } from '../../helpers';
import moment from 'moment';

// Components
import Like from '../../components/Like';

export default class Post extends Component {
    static contextTypes = {
        firstName: PropTypes.string.isRequired
    };

    static propTypes = {
        _id:        PropTypes.string.isRequired,
        avatar:     PropTypes.string.isRequired,
        comment:    PropTypes.string.isRequired,
        created:    PropTypes.number.isRequired,
        deletePost: PropTypes.func.isRequired,
        firstName:  PropTypes.string.isRequired,
        lastName:   PropTypes.string.isRequired,
        likePost:   PropTypes.func.isRequired,
        likes:      PropTypes.array.isRequired
    };

    constructor () {
        super();

        this.deletePost = ::this._deletePost;
    }

    shouldComponentUpdate (nextProps) {

        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    _deletePost () {
        this.props.deletePost(this.props._id);
    }

    render () {
        const {
            avatar,
            comment,
            created,
            firstName,
            lastName,
            likes,
            likePost,
            _id
        } = this.props;

        const { firstName: ownFirstName } = this.context;

        const isAbleToDelete = (
            <span className = { Styles.cross } onClick = { this.deletePost } />
        );

        const liked = likes.some((like) => like.firstName === ownFirstName);

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
                <Like
                    id = { _id }
                    liked = { liked }
                    likePost = { likePost }
                    likes = { likes }
                />
            </section>
        );
    }
}
