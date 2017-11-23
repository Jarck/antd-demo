import React, { Component } from 'react';
import Particles from 'react-particles-js';

import './App.css';
import WrappendNormalLoginForm from './login/Login.js'

class App extends Component {
  render() {
    return (
      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      */
      <div>
        <div>
          <WrappendNormalLoginForm />
        </div>
        <div>
          <Particles
            params={{
                    particles: {
                      line_linked: {
                        shadow: {
                          enable: true,
                          color: "#3CA9D1",
                          blur: 5
                        }
                      }
                    }
                  }}
            style={{width:'100%'} }
          />
        </div>
      </div>
    );
  }
}

export default App;
