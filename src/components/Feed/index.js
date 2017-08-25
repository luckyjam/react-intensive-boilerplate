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

    render () {
        const posts = this.state.posts.map((message, key) =>
            (<Post
                decreasePostsCount = { this.decreasePostsCount }
                deletePost = { this.deletePost }
                increasePostsCount = { this.increasePostsCount }
                index = { key }
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
