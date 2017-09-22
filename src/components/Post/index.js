// Core
import React, { Component } from 'react';

// Instruments
import homer from '../../theme/assets/homer.jpg';
import moment from 'moment';

export default class Post extends Component {
    render () {
        return (
            <section>
                <a>
                    <img alt = 'commenter' src = { homer } />
                </a>
                <a>Homer Simpson</a>
                <a>It is {moment().format('MMMM D h:mm:ss a')}.</a>
                <p>It is donuts time! Doh!</p>
            </section>
        );
    }
}
