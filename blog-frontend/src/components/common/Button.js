import React from 'react';
import styled, {
  css,
} from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/styled-components';
import { Link } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';
// import { withRouter } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';
import palette from '../../lib/styles/palette';

const ButtonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: #fff;
  outline: none;
  cursor: none;

  background-color: ${palette.gray[8]};
  &:hover {
    background-color: ${palette.gray[7]};
  }
  ${props =>
    props.fullWidth &&
    css`
      padding: 0.75rem 0;
      width: 100%;
      font-size: 1.125rem;
    `}
  &:disabled {
    background-color: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;
const StyledButton = styled.button`
  ${ButtonStyle}
`;
const LinkButton = styled(Link)`
  ${ButtonStyle}
`;

const Button = props => {
  // const Button = ({to, history, ...rest}) => {
  //   const onClick = e=>{
  //     if(to){
  //       history.push(to)
  //     }
  //     if(rest.onClick){
  //       rest.onClick(e)
  //     }
  //   }
  return props.to ? <LinkButton {...props} /> : <StyledButton {...props} />;
  // return <StyledButton {...rest,} onClick={onClick} />;
};

export default Button;
// export default withRouter(Button);
