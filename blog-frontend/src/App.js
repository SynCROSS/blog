import React from 'react';
import { Route } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';
import PostListPage from './pages/PostListPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-helmet-async';

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <title>Wo0oWo0o</title>
      </Helmet>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
    </div>
  );
};

export default App;
