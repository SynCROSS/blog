import React from 'react';
import styled from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/styled-components';
import { Link } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: ${palette.teal[8]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;
const StyledFooter = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;
const ButtonMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 1rem;
`;

const textMap = {
  login: 'Login',
  register: 'Sign Up',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="ID"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="Password"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonMarginTop fullWidth style={{ marginTop: '1rem' }}>
          {text}
        </ButtonMarginTop>
      </form>
      <StyledFooter>
        {type === 'login' ? 'No account? Create ' : 'Already have an account? '}
        {type === 'login' ? (
          <Link to="/register">one</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </StyledFooter>
    </AuthFormBlock>
  );
};

export default AuthForm;
