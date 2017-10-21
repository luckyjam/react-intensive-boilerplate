// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { string } from 'prop-types';

// Components
import Composer from '../Composer';
import Post from '../Post';
import Counter from '../Counter';
import Catcher from '../Catcher';

export default class Feed extends Component {
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired,
        api:       string.isRequired
    };

    constructor () {
        super();

        this.createPost = ::this._createPost;
        this.getPosts = ::this._getPosts;
    }

    state = {
        posts: []
    };

    componentWillMount () {
        this.getPosts();

        this.refetchPosts = setInterval(() => this.getPosts(), 5000);
    }

    componentWillUnmount () {
        clearInterval(this.refetchPosts);
    }

    _createPost (post) {
        const { api, firstName, lastName, avatar } = this.context;

        fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                avatar,
                comment: post.comment
            })
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Post was not created!');
                }

                return response.json();
            })
            .then(({ data }) =>
                this.setState(({ posts }) => ({
                    posts: [data, ...posts]
                }))
            )
            .catch(({ message }) => console.log(message));
    }

    _getPosts () {
        fetch(this.context.api, {
            method: 'GET'
        })
            .then((result) => {
                if (result.status !== 200) {
                    throw new Error('Posts were not loaded.');
                }

                return result.json();
            })
            .then(({ data }) =>
                this.setState(() => ({
                    posts: data
                }))
            )
            .catch(({ message }) => console.log(message));
    }

    render () {
        const { posts } = this.state;
        const postsList = posts.map(({
            _id,
            comment,
            created,
            firstName,
            lastName,
            avatar
        }) => (
            <Post
                avatar = { avatar }
                comment = { comment }
                created = { created }
                firstName = { firstName }
                key = { _id }
                lastName = { lastName }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <Catcher>
                    <Composer createPost = { this.createPost } />
                </Catcher>
                <Counter count = { posts.length } />
                {postsList}
            </section>
        );
    }
}
