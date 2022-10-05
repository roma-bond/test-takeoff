import { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login, setId } from '../../features/auth/authSlice';
import { fetchContactsAction } from '../../features/contacts/contactsAPI';
import { setContacts } from '../../features/contacts/contactsSlice';
import { useAppDispatch } from '../../app/hooks';
import { AppRoute } from '../../utils/const';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let enteredEmail: string;
    let enteredPassword: string;

    if (emailInputRef.current && passwordInputRef.current) {
      enteredEmail = emailInputRef.current.value;
      enteredPassword = passwordInputRef.current.value;
    } else {
      // error
      return;
    }

    setIsLoading(true);
    if (isLogin) {
      axios
        .post('http://localhost:5000/api/auth/login', {
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((response) => {
          const expirationTime = new Date(new Date().getTime() + 3600000);
          dispatch(
            login({
              token: response.data.access_token,
              time: expirationTime.toISOString(),
            })
          );
          dispatch(setId(response.data.id));
          setIsLoading(false);
          setError('');
          dispatch(
            fetchContactsAction({
              token: response.data.access_token,
              id: response.data.id,
            })
          );

          // dispatch(setContacts(response.data.contacts));
          navigate(AppRoute.Home);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setIsLoading(false);
        });
    } else {
      axios
        .post('http://localhost:5000/api/auth/register', {
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((response) => {
          const expirationTime = new Date(new Date().getTime() + 3600000);
          dispatch(
            login({
              token: response.data.access_token,
              time: expirationTime.toISOString(),
            })
          );
          dispatch(setId(response.data.id));
          setIsLoading(false);
          setError('');
          dispatch(setContacts([]));
          navigate(AppRoute.Home);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Ваш Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Ваш пароль</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Создать аккаунт'}</button>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {isLoading && <p>Sending request ...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Создать новый аккаунт' : 'У меня уже есть аккаунт'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
