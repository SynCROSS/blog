import React from 'react';
// import Editor from '../components/write/Editor';
// import TagBox from '../components/write/TagBox';
// import WriteActionButtons from '../components/write/WriteActionButtons';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-helmet-async';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>Write Post - Wo0oWo0o</title>
      </Helmet>
      {/* <Editor /> */}
      <EditorContainer />
      {/* <TagBox /> */}
      <TagBoxContainer />
      {/* <WriteActionButtons /> */}
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
