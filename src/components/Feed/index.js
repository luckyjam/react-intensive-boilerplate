// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

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

    increasePostsCount = () => {
        this.setState({
            postsCount: this.state.postsCount + 1
        });
    };

    render () {
        const posts = this.state.posts.map((message, key) =>
            (<Post
                increasePostsCount = { this.increasePostsCount }
                key = { key }
                message = { message }
            />)
        );

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                <Counter count = { this.state.postsCount } />
                {posts}
            </section>
        );
    }
}
