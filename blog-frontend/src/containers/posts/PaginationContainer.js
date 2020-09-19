import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-redux';
import { withRouter } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';
import qs from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/qs';

const PaginationContainer = ({ location, match }) => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));
  if (!posts || loading) return null;
  const { username } = match.params;
  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
