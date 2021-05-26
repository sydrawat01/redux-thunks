import { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import DashboardPage from './pages/DashboardPage';

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={DashboardPage} />
        <Route path="/posts" exact component={PostsPage} />
        <Route path="/posts/:id" component={PostPage} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
