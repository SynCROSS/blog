import React from 'react';
import styled from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/styled-components';
import Responsive from './Responsive';
import Button from './Button';
import MainLogo from '../../logo/MainLogo.svg';
import { Link } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .linkedLogo {
    margin-top: 0.2308rem;
  }
  .logo {
    ${'' /* font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px; */}
    width: 14rem;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          {/* <div className="logo"> */}
          <Link to="/" className="linkedLogo">
            <img src={MainLogo} alt="logo" className="logo" />
          </Link>
          {/* </div> */}
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>Logout</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">Login</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
