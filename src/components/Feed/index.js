// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { string } from 'prop-types';
import {
    CSSTransition,
    Transition,
    TransitionGroup
} from 'react-transition-group';
import { fromTo } from 'gsap';

// Components
import Composer from '../Composer';
import Post from '../Post';
import Counter from '../Counter';
import Postman from '../Postman';
import Spinner from '../Spinner';

export default class Feed extends Component {
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired,
        api:       string.isRequired
    };

    constructor () {
        super();

        this.createPost = ::this._createPost;
        this.getPosts = ::this._getPosts;
        this.deletePost = ::this._deletePost;
        this.handleComposerAppear = ::this._handleComposerAppear;
        this.handleCounterAppear = ::this._handleCounterAppear;
        this.handlePostmanAppear = ::this._handlePostmanAppear;
        this.handlePostmanDisappear = ::this._handlePostmanDisappear;
        this.startPostsFetching = ::this._startPostsFetching;
        this.stopPostsFetching = ::this._stopPostsFetching;
        this.likePost = ::this._likePost;
    }

    state = {
        posts:         [],
        postsFetching: false
    };

    componentWillMount () {
        this.getPosts();

        this.refetchPosts = setInterval(() => this.getPosts(), 5000);
    }

    componentWillUnmount () {
        clearInterval(this.refetchPosts);
    }

    _startPostsFetching () {
        this.setState(() => ({
            postsFetching: true
        }));
    }

    _stopPostsFetching () {
        this.setState(() => ({
            postsFetching: true
        }));
    }

    async _createPost (post) {
        try {
            const { api, firstName, lastName, avatar } = this.context;

            this.startPostsFetching();

            const response = await fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    avatar,
                    comment: post.comment
                })
            });

            if (response.status !== 200) {
                this.stopPostsFetching();
                throw new Error('Post was not created!');
            }

            const { data } = await response.json();

            this.setState(({ posts }) => ({
                posts:         [data, ...posts],
                postsFetching: false
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _getPosts () {
        try {
            this.startPostsFetching();
            const response = await fetch(this.context.api, {
                method: 'GET'
            });

            if (response.status !== 200) {
                this.stopPostsFetching();
                throw new Error('Posts were not loaded.');
            }

            const { data } = await response.json();

            this.setState(() => ({
                posts:         data,
                postsFetching: false
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _deletePost (_id) {
        try {
            const { api } = this.context;

            this.startPostsFetching();

            const response = await fetch(`${api}/${_id}`, {
                method: 'DELETE'
            });

            if (response.status !== 200) {
                this.stopPostsFetching();
                throw new Error('Post were not deleted!');
            }

            this.setState(({ posts }) => ({
                posts:         posts.filter((post) => post._id !== _id),
                postsFetching: false
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _likePost (_id, firstName, lastName) {
        try {
            this.startPostsFetching();
            const response = await fetch(`${this.context.api}/${_id}`, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    firstName,
                    lastName
                })
            });

            if (response.status !== 200) {
                this.stopPostsFetching();
                throw new Error('Post were not liked.');
            }

            this.stopPostsFetching();
        } catch ({ message }) {
            console.log(message);
        }
    }

    _handleComposerAppear (composer) {
        fromTo(composer, 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 });
    }

    _handleCounterAppear (counter) {
        fromTo(counter, 1, { x: -300, opacity: 0 }, { x: 0, opacity: 1 });
    }

    _handlePostmanAppear (postman) {
        fromTo(
            postman,
            2,
            { x: 300, opacity: 0 },
            {
                x:       0,
                opacity: 1
            }
        );
    }

    _handlePostmanDisappear (postman) {
        fromTo(postman, 2, { x: 0, opacity: 1 }, { x: 300, opacity: 0 });
    }

    render () {
        const { posts, postsFetching } = this.state;
        const postsList = posts.map(
            ({ _id, comment, created, firstName, lastName, avatar, likes }) => (
                <CSSTransition
                    appear
                    classNames = { {
                        enter:        Styles.postEnter,
                        enterActive:  Styles.postEnterActive,
                        appear:       Styles.postAppear,
                        appearActive: Styles.postAppearActive,
                        exit:         Styles.postDelete,
                        exitActive:   Styles.postDeleteActive
                    } }
                    key = { _id }
                    timeout = { 1000 }>
                    <Post
                        _id = { _id }
                        avatar = { avatar }
                        comment = { comment }
                        created = { created }
                        deletePost = { this.deletePost }
                        firstName = { firstName }
                        lastName = { lastName }
                        likePost = { this.likePost }
                        likes = { likes }
                    />
                </CSSTransition>
            )
        );

        const spinner = postsFetching ? <Spinner /> : null;

        return (
            <section className = { Styles.feed }>
                {spinner}
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleComposerAppear }>
                    <Composer createPost = { this.createPost } />
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleCounterAppear }>
                    <Counter count = { posts.length } />
                </Transition>
                <TransitionGroup>{postsList}</TransitionGroup>
                <Transition
                    appear
                    in
                    timeout = { 10000 }
                    onEnter = { this.handlePostmanAppear }
                    onEntered = { this.handlePostmanDisappear }>
                    <Postman />
                </Transition>
            </section>
        );
    }
}
