import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import BlogsList from './components/BlogsList/BlogsList';
import image from './assets/TrueCaller_Logo.png';

import BlogPost from './components/BlogPost';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <nav className="navbar navbar-light">
          <NavLink to="/">
            <img src={image} width="150px" alt="" loading="lazy" />
          </NavLink>
          </nav>
        </div>
      </header>
        <Switch>
          <Route path='/post' component={BlogPost}></Route>
          <Route path='/' component={BlogsList}></Route>
        </Switch>
    </div>
  );
}

export default App;
