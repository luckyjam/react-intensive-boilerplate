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

    createPost = () => {
        this.setState({
            posts: this.state.posts.concat('new post')
        });
    };

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
