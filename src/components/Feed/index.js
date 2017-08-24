// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class Feed extends Component {
    posts = [];

    createPost = (post) => {
        this.posts.push(post);
        this.forceUpdate();
    };

    render () {
        const posts = this.posts.map((post, key) => <Post key = { key } />);

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                {posts}
            </section>
        );
    }
}
