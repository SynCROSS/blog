import React, { useEffect, useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };
  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes('')) {
      setError("There's a blank! Check the blank and write all.");
      return;
    }
    if (password !== passwordConfirm) {
      setError('Both Passwords are not same.');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);
  useEffect(() => {
    if (authError) {
      // console.log('Error!');
      // console.log(authError);
      if (authError.response.status === 409) {
        setError('Already Account exists');
        return;
      }
      setError('Failed to Register');
      return;
    }
    if (auth) {
      console.log('Success to Register');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    if (user) {
      // console.log('checkAPI Successfully works');
      // console.log(user);
      // var move = confirm('Shall we go Login?');
      // if (move == true) {
      history.push('/login');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
      //   move = confirm('Do you want to stay here?');
      // }
      // if (move == true) return;
      // else history.push('/');
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);