import React, { useState, useCallback, useEffect } from 'react';
import styled from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;
  h4{
  color: ${palette.gray[8]}
  margin-top: 0;
  margin-bottom: .5rem;
}
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  input {
    padding: 0.5rem;
    flex: 1;
  }
  button {
    cursor: pointer;
    ${'' /* padding: 1rem 0; */}
    border: none;
    background-color: ${palette.gray[8]};
    color: #fff;
    font-weight: bold;
    &:hover {
      background-color: ${palette.gray[7]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    tag => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      const nextTags = [...localTags, tag];
      // setLocalTags([...localTags, tag]);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag);
      setLocalTags(localTags.filter(t => t !== tag));
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );
  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag],
  );
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);
  return (
    <TagBoxBlock>
      <h4>Tags</h4>
      <TagForm onSubmit={onSubmit}>
        {/* <input value="#" /> */}
        <input placeholder="#tag" value={input} onChange={onChange} />
        <button type="submit">Add</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
