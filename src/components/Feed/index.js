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
import Postman from '../../components/Postman';

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
        this.handlePostmanAppear = ::this._handlePostmanAppear;
        this.handlePostmanDisappear = ::this._handlePostmanDisappear;
        this.likePost = ::this._likePost;
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

    _likePost (_id, firstName, lastName) {
        fetch(`${this.context.api}/${_id}`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                firstName,
                lastName
            })
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Post were not liked.');
                }

                this.setState({
                    isPostsFetching: true
                });

                this.getPosts();
            })
            .then(() => {
                this.setState({
                    isPostsFetching: false
                });
            })
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

    _handlePostmanAppear () {
        TweenMax.fromTo(
            this.postman,
            2,
            {
                opacity: 0
            },
            {
                opacity:    1,
                onComplete: () =>
                    setTimeout(() => this.handlePostmanDisappear(), 5000)
            }
        );
    }

    _handlePostmanDisappear () {
        TweenMax.fromTo(
            this.postman,
            2,
            {
                opacity: 1
            },
            {
                opacity: 0
            }
        );
    }

    handlePostEnter = () => {
        TweenMax.fromTo(this.post, 0.5, { opacity: 0 }, { opacity: 1 });
    };

    handlePostExit = () => {
        TweenMax.fromTo(this.post, 0.5, { y: 0 }, { y: 1000 });
    };

    render () {
        const { posts, isPostsFetching } = this.state;
        const postsList = posts.map(
            ({ avatar, comment, created, firstName, lastName, likes, _id }) => (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.postEnter,
                        enterActive: Styles.postEnterActive,
                        exit:        Styles.postExit,
                        exitActive:  Styles.postExitActive
                    } }
                    key = { _id }
                    timeout = { { enter: 300, exit: 500 } }>
                    <Post
                        _id = { _id }
                        avatar = { avatar }
                        comment = { comment }
                        created = { created }
                        deletePost = { this.deletePost }
                        firstName = { firstName }
                        key = { _id }
                        lastName = { lastName }
                        likePost = { this.likePost }
                        likes = { likes }
                    />
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
                <Transition
                    appear
                    in
                    timeout = { 4000 }
                    onEnter = { this.handlePostmanAppear }>
                    <div ref = { (postman) => this.postman = postman }>
                        <Postman />
                    </div>
                </Transition>
            </section>
        );
    }
}
