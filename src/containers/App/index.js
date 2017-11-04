// Core
import React, { Component } from 'react';

// Instruments
// import Styles from './styles.scss';
import { string } from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import List from '../../components/List';
import MovieInfo from '../../components/MovieInfo';

const apiKey = 'f95b4780d100c9d941e03e79486e1503';

export const options = {
    apiUrl: `https://api.themoviedb.org/3/discover/movie?certification_country=US&api_key=${apiKey}`,
    apiKey
};
export default class App extends Component {

    static childContextTypes = {
        apiUrl: string.isRequired,
        apiKey: string.isRequired
    }

    getChildContext () {
        return options;
    }


    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact component = { List } path = '/' />
                    <Route component = { MovieInfo } path = '/:movieId' />
                </Switch>
            </BrowserRouter>
        );
    }
}
