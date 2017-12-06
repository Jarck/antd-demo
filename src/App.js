import React, { Component } from 'react';
import Particles from 'react-particles-js';

import asyncComponent from './components/AsyncComponent';

const Login = asyncComponent(() => import('./login/Login'));
const Main = asyncComponent(() => import('./components/Main'));

class App extends Component {
  render() {
    let token = localStorage.getItem('skio-token');
    if (token === '' || token === undefined || token === null) {
      return this.renderToLogin();
    } else {
      return (
        <Main />
      )
    }
  }

  renderToLogin() {
    return (
      <div>
        <div>
          <Login />
        </div>
        <div>
          <Particles
            params={{
                    particles: {
                      line_linked: {
                        shadow: {
                          enable: true,
                          color: "#3CA9D1",
                          blur: 5,
                        }
                      }
                    }
                  }}
            style={ {width:'100%'} }
          />
        </div>
      </div>
    );
  }
}

export default App;
