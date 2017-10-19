// Core
import React, { Component } from 'react';

// Instruments
import avatar from '../../theme/assets/avatar.jpg';
import moment from 'moment';

export default class Post extends Component {
    render () {
        return (
            <section>
                <img alt = 'commenter' src = { avatar } />
                <a>Homer Simpson</a>
                <a>It is {moment().format('MMMM D h:mm:ss a')}.</a>
                <p>hi!</p>
            </section>
        );
    }
}
