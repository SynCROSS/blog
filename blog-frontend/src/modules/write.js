import {
  createAction,
  handleActions,
} from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);
export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => ({
    id,
    title,
    body,
    tags,
  }),
);

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const write = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => {
      return {
        ...state,
        [key]: value,
      };
    },
    [WRITE_POST]: state => {
      return {
        ...state,
        post: null,
        postError: null,
      };
    },
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => {
      return {
        ...state,
        post,
      };
    },
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => {
      return {
        ...state,
        postError,
      };
    },
    [SET_ORIGINAL_POST]: (state, { payload: post }) => {
      return {
        ...state,
        title: post.title,
        body: post.body,
        tags: post.tags,
        originalPostId: post._id,
      };
    },
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => {
      return {
        ...state,
        post,
      };
    },
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => {
      return {
        ...state,
        postError,
      };
    },
  },
  initialState,
);

export default write;