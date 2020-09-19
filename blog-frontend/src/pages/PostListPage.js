import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
// import PostList from '../components/posts/PostList';
// import Header from '../components/common/Header';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      {/* <Header /> */}
      <PostListContainer />
      {/* <PostList /> */}
      <PaginationContainer />
    </>
  );
};

export default PostListPage;
