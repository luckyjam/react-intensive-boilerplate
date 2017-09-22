// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Post extends Component {
    static contextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    };

    static propTypes = {
        _id:                PropTypes.string.isRequired,
        comment:            PropTypes.string.isRequired,
        decreasePostsCount: PropTypes.func.isRequired,
        deletePost:         PropTypes.func.isRequired,
        increasePostsCount: PropTypes.func.isRequired
    };

    componentWillMount () {
        this.props.increasePostsCount();
    }

    shouldComponentUpdate (nextProps) {
        return nextProps.comment !== this.props.comment;
    }

    componentWillUnmount () {
        this.props.decreasePostsCount();
    }

    deletePost = () => {
        this.props.deletePost(this.props._id);
    };

    render () {
        const { firstName, lastName, avatar } = this.context;
        const { comment } = this.props;

        return (
            <section className = { Styles.post }>
                <span onClick = { this.deletePost } />
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>{`${firstName} ${lastName}`}</a>
                <a className = { Styles.time }>
                    {moment().format('MMMM D h:mm:ss a')}
                </a>
                <p className = { Styles.comment }>{comment}</p>
            </section>
        );
    }
}
