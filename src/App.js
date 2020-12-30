import React, { useEffect } from "react";
import './App.css';
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";
import { useDispatch } from 'react-redux'

import history from './history';

import Navbar from './components/navigation/Navbar';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';

import { SET_USER_DATA } from './redux/actions/User';

// Restore user data
let userData = localStorage.getItem('user');
if(userData) {
    userData = JSON.parse(userData);
}

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('useEffect: ', userData);
        dispatch({ type: SET_USER_DATA, payload: { user: userData } });
    })
    return (
        <Router history={history}>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    {userData ? <MainPage /> : <HomePage />}
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/dashboard">
                    <DashboardPage />
                </Route>
                <Route path="/users/">
                    <UserPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;