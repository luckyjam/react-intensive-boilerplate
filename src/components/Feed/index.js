// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import TweenMax from 'gsap';
import {
    CSSTransition,
    Transition,
    TransitionGroup
} from 'react-transition-group';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Catcher from '../../components/Catcher';

export default class Feed extends Component {
    static contextTypes = {
        api: PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.getPosts = ::this._getPosts;
        this.createPost = ::this._createPost;
        this.deletePost = ::this._deletePost;
        this.handleComposerAppear = ::this._handleComposerAppear;
        this.handleCounterAppear = ::this._handleCounterAppear;
    }

    state = {
        posts:           [],
        isPostsFetching: false
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

                this.setState({
                    isPostsFetching: true
                });

                return result.json();
            })
            .then(({ data }) => {
                this.setState({
                    posts:           data,
                    isPostsFetching: false
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

                this.setState({
                    isPostsFetching: true
                });

                return response.json();
            })
            .then(({ data }) =>
                this.setState(({ posts }) => ({
                    posts:           [data, ...posts],
                    isPostsFetching: false
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

                this.setState({
                    isPostsFetching: true
                });
            })
            .then(() =>
                this.setState({
                    posts:           posts.filter((post) => post._id !== _id),
                    isPostsFetching: false
                })
            )
            .catch(({ message }) => console.log(message)); // eslint-disable-line
    }

    _handleComposerAppear () {
        TweenMax.fromTo(
            this.composer,
            1,
            {
                y:       -200,
                opacity: 0
            },
            {
                y:       0,
                opacity: 1
            }
        );
    }

    _handleCounterAppear () {
        TweenMax.fromTo(
            this.counter,
            1,
            {
                x:       -1000,
                opacity: 0
            },
            {
                x:       0,
                opacity: 1
            }
        );
    }

    render () {
        const { posts, isPostsFetching } = this.state;
        const postsList = posts.map(
            ({ avatar, comment, created, firstName, lastName, _id }) => (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.postEnter,
                        enterActive: Styles.postEnterActive,
                        exit:        Styles.postExit,
                        exitActive:  Styles.postExitActive
                    } }
                    key = { _id }
                    timeout = { { enter: 300, exit: 500 } }>
                    <Catcher>
                        <Post
                            _id = { _id }
                            avatar = { avatar }
                            comment = { comment }
                            created = { created }
                            deletePost = { this.deletePost }
                            firstName = { firstName }
                            lastName = { lastName }
                        />
                    </Catcher>
                </CSSTransition>
            )
        );

        const spinner = isPostsFetching ? <Spinner /> : null;

        return (
            <section className = { Styles.feed }>
                {spinner}
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleComposerAppear }>
                    <div ref = { (composer) => this.composer = composer }>
                        <Composer createPost = { this.createPost } />
                    </div>
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleCounterAppear }>
                    <div ref = { (counter) => this.counter = counter }>
                        <Counter count = { postsList.length } />
                    </div>
                </Transition>
                <TransitionGroup>{postsList}</TransitionGroup>
            </section>
        );
    }
}
