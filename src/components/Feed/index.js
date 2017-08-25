// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class Feed extends Component {
    state = {
        posts: []
    };

    createPost = (message) => {
        this.setState({
            posts: this.state.posts.concat(message)
        });
    };

    render () {
        const posts = this.state.posts.map((message, key) =>
            <Post key = { key } message = { message } />
        );

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                {posts}
            </section>
        );
    }
}
