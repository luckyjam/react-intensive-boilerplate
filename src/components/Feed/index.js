// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import TweenMax from 'gsap';
import { CSSTransition } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';

export default class Feed extends Component {
    state = {
        posts:      [],
        postsCount: 0
    };

    createPost = (message) => {
        this.setState({
            posts: this.state.posts.concat(message)
        });
    };

    deletePost = (index) => {
        this.setState({
            posts: this.state.posts.filter((item, ind) => ind !== index)
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

    handleComposerAppear = () => {
        TweenMax.fromTo(this.composer, 1.2, { y: -200 }, { y: 0 });
    };

    handleCounterAppear = () => {
        TweenMax.fromTo(this.counter, 1.2, { opacity: 0 }, { opacity: 1 });
    };

    render () {
        const posts = this.state.posts.map(({ message, id }, index) =>
            (<CSSTransition
                appear
                classNames = { {
                    enter:       Styles.postEnter,
                    enterActive: Styles.postEnterActive,
                    exit:        Styles.postExit,
                    exitActive:  Styles.postExitActive
                } }
                key = { id }
                timeout = { { enter: 300, exit: 300 } }>
                <Post
                    decreasePostsCount = { this.decreasePostsCount }
                    deletePost = { this.deletePost }
                    increasePostsCount = { this.increasePostsCount }
                    index = { index }
                    message = { message }
                />
            </CSSTransition>)
        );

        return (
            <section className = { Styles.feed }>
                <Transition
                    appear
                    in
                    timeout = { 500 }
                    onEnter = { this.handleComposerAppear }>
                    <div ref = { (composer) => this.composer = composer }>
                        <Composer createPost = { this.createPost } />
                    </div>
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 500 }
                    onEnter = { this.handleCounterAppear }>
                    <div ref = { (counter) => this.counter = counter }>
                        <Counter count = { this.state.postsCount } />
                    </div>
                </Transition>
                <TransitionGroup>
                    {posts}
                </TransitionGroup>
            </section>
        );
    }
}
