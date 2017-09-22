// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

export default class Like extends Component {
    static propTypes = {
        id:       PropTypes.string.isRequired,
        liked:    PropTypes.bool.isRequired,
        likePost: PropTypes.func.isRequired,
        likes:    PropTypes.array.isRequired
    };

    static contextTypes = {
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.setShowLikersState = ::this._setShowLikersState;
        this.likePost = ::this._likePost;
    }

    state = {
        showLikers: false
    };

    _setShowLikersState (value) {
        this.setState({
            showLikers: value
        });
    }

    _likePost () {
        const { likePost, id } = this.props;
        const { firstName, lastName } = this.context;


        likePost(id, firstName, lastName);
    }

    render () {
        const { liked, likes } = this.props;
        const { showLikers } = this.state;

        const likeStyles = liked
            ? `${Styles.icon} ${Styles.liked}`
            : `${Styles.icon}`;

        const likers = likes.map(({ firstName, lastName }, index) => (
            <li key = { index }>{`${firstName} ${lastName}`}</li>
        ));

        const likersList =
            showLikers && likers.length ? <ul>{likers}</ul> : null;

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this.likePost }
                    onMouseEnter = { () => this.setShowLikersState(true) }
                    onMouseLeave = { () => this.setShowLikersState(false) }>
                    {likes.length}
                </span>
                {likersList}
            </section>
        );
    }
}
