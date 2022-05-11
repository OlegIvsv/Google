import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AccountPage from './myComponents/AccountPage';
import './custom.css';
import LogInForm from './myComponents/LogInForm';
import SignUpForm from './myComponents/SignUpForm';
import SearchPage from './myComponents/SearchPage';
import AddForm from './myComponents/AddForm.js';
import Article from './myComponents/Article';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={SearchPage} />
        <Route path='/account-setting' component={AccountPage} />
          <Route path='/account-setting/sign-up' component={SignUpForm} />
          <Route path='/account-setting/log-in' component={LogInForm} />
        <Route path='/add-data' component={AddForm} />
        <Route path='/add-user' component={SignUpForm} />
        <Route path='/articles' component={SearchPage} />
          <Route path='/articles/:id' component={Article} />
      </Layout>
    );
  }
}
