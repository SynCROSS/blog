import React, { useEffect, useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

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
      history.push('/login');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
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
