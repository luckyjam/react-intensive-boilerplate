// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import { CSSTransition } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';

export default class Feed extends Component {
    static contextTypes = {
        api: PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.getPosts = ::this._getPosts;
        this.createPost = ::this._createPost;
        this.deletePost = ::this._deletePost;
    }

    state = {
        posts: []
    };

    componentWillMount () {
        this.getPosts();

        this.refetchPosts = setInterval(() => this.getPosts(), 5000);
    }

    componentWillUnmount () {
        clearInterval(this.refetchPosts);
    }

    _getPosts () {
        fetch(this.context.api, {
            method: 'GET'
        })
            .then((result) => {
                if (result.status !== 200) {
                    throw new Error('Posts were not loaded.');
                }

                return result.json();
            })
            .then(({ data }) => {
                this.setState({
                    posts: data
                });
            })
            .catch(({ message }) => console.log(message)); // eslint-disable-line
    }

    _createPost (post) {
        const { firstName, lastName, avatar, comment } = post;
        const { api } = this.context;

        fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                avatar,
                comment
            })
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Post was not created!');
                }

                return response.json();
            })
            .then(({ data }) =>
                this.setState(({ posts }) => ({
                    posts: [data, ...posts]
                }))
            )
            .catch(({ message }) => console.log(message)); // eslint-disable-line
    }

    _deletePost (_id) {
        const { posts } = this.state;
        const { api } = this.context;

        fetch(`${api}/${_id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Post was not deleted.');
                }
            })
            .then(() =>
                this.setState({
                    posts: posts.filter((post) => post._id !== _id)
                })
            )
            .catch(({ message }) => console.log(message)); // eslint-disable-line
    }

    render () {
        const { posts } = this.state;
        const postsList = posts.map(({ comment, _id }) => (
            <CSSTransition
                classNames = { {
                    enter:       Styles.postEnter,
                    enterActive: Styles.postEnterActive
                } }
                key = { _id }
                timeout = { { enter: 300, exit: 0 } }>
                <Post
                    _id = { _id }
                    comment = { comment }
                    deletePost = { this.deletePost }
                />
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                <Counter count = { postsList.length } />
                <TransitionGroup>{postsList}</TransitionGroup>
            </section>
        );
    }
}
