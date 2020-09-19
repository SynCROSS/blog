import {
  createAction,
  handleActions,
} from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga.js';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/redux-saga/effects';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');
export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }) => ({ tag, username, page }),
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => {
      return {
        ...state,
        posts,
        lastPage: parseInt(response.headers['last-page'], 10),
      };
    },
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => {
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default posts;
