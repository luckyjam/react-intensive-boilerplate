// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { CSSTransition } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';

export default class Feed extends Component {
    constructor () {
        super();

        this.createPost = ::this._createPost;
    }

    state = {
        posts:      [],
        postsCount: 0
    };

    _createPost (post) {
        this.setState(({ posts }) => ({
            posts: [post, ...posts]
        }));
    }

    deletePost = (_id) => {
        this.setState({
            posts: this.state.posts.filter((item) => item._id !== _id)
        });
    };

    increasePostsCount = () => {
        this.setState({
            postsCount: this.state.postsCount + 1
        });
    };

    decreasePostsCount = () => {
        this.setState({
            postsCount: this.state.postsCount - 1
        });
    };

    render () {
        const posts = this.state.posts.map(({ comment, _id }) => (
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
                    decreasePostsCount = { this.decreasePostsCount }
                    deletePost = { this.deletePost }
                    increasePostsCount = { this.increasePostsCount }
                />
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                <Counter count = { this.state.postsCount } />
                <TransitionGroup>{posts}</TransitionGroup>
            </section>
        );
    }
}
