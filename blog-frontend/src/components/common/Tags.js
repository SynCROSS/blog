import React from 'react';
import styled from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/styled-components';
import { Link } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';

const TagsBlock = styled.div`
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
`;

const Tags = ({ tags }) => {
  return (
    <TagsBlock>
      {tags.map(tag => (
        <Link key={tag} className="tag" to={`/?tag=${tag}`}>
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;
