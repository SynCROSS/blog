import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonsBlock = styled.div`
  margin: 1rem 0;
  button + button {
    margin-left: 0.5rem;
  }
`;
const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
  return (
    <WriteActionButtonsBlock>
      <StyledButton onClick={onPublish}>
        &nbsp;{isEdit ? 'Edit 🛠' : ' Post It!'}&nbsp;
      </StyledButton>
      <StyledButton onClick={onCancel}>Cancel</StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
