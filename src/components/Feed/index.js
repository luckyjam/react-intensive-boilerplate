// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { string } from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Components
import Composer from '../Composer';
import Post from '../Post';
import Counter from '../Counter';
import Catcher from '../Catcher';
import Postman from '../Postman';
import avatar from '../../theme/assets/avatar.jpg';

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
        this.deletePost = ::this._deletePost;
    }

    state = {
        posts: [
            {
                _id:       '123',
                created:   1508588409160,
                firstName: 'Dima',
                lastName:  'Vakatsiienko',
                avatar,
                comment:   'hello'
            },
            {
                _id:       '345',
                created:   1508588409160,
                firstName: 'Dima',
                lastName:  'Vakatsiienko',
                avatar,
                comment:   'hello'
            },
            {
                _id:       '678',
                created:   1508588409160,
                firstName: 'Dima',
                lastName:  'Vakatsiienko',
                avatar,
                comment:   'hello'
            }
        ]
    };

    // componentWillMount () {
    //     this.getPosts();
    //
    //     this.refetchPosts = setInterval(() => this.getPosts(), 5000);
    // }
    //
    // componentWillUnmount () {
    //     clearInterval(this.refetchPosts);
    // }

    _createPost (post) {
        const { api, firstName, lastName, avatar } = this.context;

        // fetch(api, {
        //     method:  'POST',
        //     headers: {
        //         'Content-Type': 'application/json; charset=utf-8'
        //     },
        //     body: JSON.stringify({
        //         firstName,
        //         lastName,
        //         avatar,
        //         comment: post.comment
        //     })
        // })
        //     .then((response) => {
        //         if (response.status !== 200) {
        //             throw new Error('Post was not created!');
        //         }
        //
        //         return response.json();
        //     })
        //     .then(({ data }) =>
                this.setState(({ posts }) => ({
                    posts: [post, ...posts]
                }))
            // )
            // .catch(({ message }) => console.log(message));
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

    async _deletePost (_id) {
        // try {
        //     const { api } = this.context;
        //
        //     const response = await fetch(`${api}/${_id}`, {
        //         method: 'DELETE'
        //     });
        //
        //     if (response.status !== 200) {
        //         throw new Error('Post were not deleted!');
        //     }
        //
            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post._id !== _id)
            }));
        // } catch ({ message }) {
        //     console.log(message);
        // }
    }

    render () {
        const { posts } = this.state;
        const postsList = posts.map(
            ({ _id, comment, created, firstName, lastName, avatar }) => (
                <CSSTransition
                    appear
                    classNames = { {
                        enter:        Styles.postEnter,
                        enterActive:  Styles.postEnterActive,
                        appear:       Styles.postAppear,
                        appearActive: Styles.postAppearActive,
                        exit:         Styles.postDelete,
                        exitActive:   Styles.postDeleteActive
                    } }
                    key = { _id }
                    timeout = { 1000 }>
                    <Post
                        _id = { _id }
                        avatar = { avatar }
                        comment = { comment }
                        created = { created }
                        deletePost = { this.deletePost }
                        firstName = { firstName }
                        lastName = { lastName }
                    />
                </CSSTransition>
            )
        );

        return (
            <section className = { Styles.feed }>
                <Catcher>
                    <Composer createPost = { this.createPost } />
                </Catcher>
                <Counter count = { posts.length } />
                <TransitionGroup>{postsList}</TransitionGroup>
                <Postman />
            </section>
        );
    }
}
