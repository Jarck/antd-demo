import asyncComponent from '../AsyncComponent';

const Company = asyncComponent(() => import('../../containers/companies'));

const routes = [
  { path: '/companies', component: Company },
]

export default routes;
