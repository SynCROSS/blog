import React from 'react';
import styled from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;
/* const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]}
  span+span:before{
    color: ${palette.gray[5]};
    padding: 0 .25rem;
    content: '\\B7';
  }`;
const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: #00376b;
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      cursor: pointer;
      color: #5a7e9f;
    }
  }
`; */
const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>This Post is NOT exist</PostViewerBlock>;
    }
    return <PostViewerBlock>Error has occurred!</PostViewerBlock>;
  }
  if (loading || !post) {
    return null;
  }
  const { title, body, user, publishedDate, tags } = post;

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - Wo0oWo0o</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          hasMarginTop
        />
        {/* <SubInfo>
          <span>
            <b>{user.username}</b>
          </span>
          <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </SubInfo> */}
        <Tags tags={tags} />
        {/* <Tags>
          {tags.map(tag => (
            <div className="tag">#{tag}</div>
          ))}
        </Tags> */}
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
