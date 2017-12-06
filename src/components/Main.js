import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routes/index';

import PrivateLayout from './layout/Layout';

class Main extends React.Component {
  render() {
    return (
      <div>
      <Router>
        <PrivateLayout>
          <Switch>
            {
              Routes.map((item, i) => {
                return (<Route exact key={i} path={`${item.path}`} component={item.component} />)
              })
            }
          </Switch>
        </PrivateLayout>
      </Router>
      </div>
    )
  }
}

export default Main;
