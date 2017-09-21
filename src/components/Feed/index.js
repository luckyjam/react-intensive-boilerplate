// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class Feed extends Component {
    constructor () {
        super();

        this.createPost = ::this._createPost;
    }

    state = {
        posts: []
    };

    _createPost () {
        this.setState(({ posts }) => ({
            posts: ['new post', ...posts]
        }));
    }

    render () {
        const posts = this.state.posts.map((post, key) => <Post key = { key } />);

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                {posts}
            </section>
        );
    }
}
