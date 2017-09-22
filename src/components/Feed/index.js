// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

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

    increasePostsCount = () => {
        this.setState({
            postsCount: this.state.postsCount + 1
        });
    };

    render () {
<<<<<<< HEAD
        const posts = this.state.posts.map(({ message, id }) =>
            (<Post
                increasePostsCount = { this.increasePostsCount }
                key = { id }
                message = { message }
            />)
        );
=======
        const posts = this.state.posts.map(({ comment, _id }) => (
            <Post comment = { comment } key = { _id } />
        ));
>>>>>>> 6ed5574... refactor composer

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                <Counter count = { this.state.postsCount } />
                {posts}
            </section>
        );
    }
}
