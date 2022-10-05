import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { logout, setId } from '../../features/auth/authSlice';
import { setContacts } from '../../features/contacts/contactsSlice';
import { AppRoute } from '../../utils/const';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(setId(null));
    dispatch(setContacts([]));
    navigate(AppRoute.Auth);
  };

  return (
    <header className={classes.header}>
      <Link to={AppRoute.Home}>
        <div className={classes.logo}>React Контакты</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <li>
              <Link to={AppRoute.Auth}>Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to={AppRoute.Contacts}>Контакты</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
