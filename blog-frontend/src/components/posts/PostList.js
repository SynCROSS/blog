import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;
const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;
const PostItemBlock = styled.div`
  padding: 3rem 0;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  h2 {
    font-size: 2rem;
    margin: 0 auto;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;
/* const SubInfo = styled.div`color: ${palette.gray[6]}
  span+span:before{
    color: ${palette.gray[4]}
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
      color: #5a7e9f;
    }
  }
`; */

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      {/* <SubInfo>
        <span>
          <b>{user.username}</b>
        </span>
        <span>{new Date().toLocaleDateString()}</span>
      </SubInfo> */}
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};
const PostList = ({ posts, loading, error, showWriteButton }) => {
  if (error) {
    // console.log(error);
    return <PostListBlock>Error has occurred!</PostListBlock>;
  }
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && <Button to="/write">Write Post</Button>}
      </WritePostButtonWrapper>
      {!loading && posts && (
        <div>
          {posts.map(post => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
