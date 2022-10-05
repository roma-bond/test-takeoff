import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <section className={classes.starting}>
      <h1>{isLoggedIn ? 'Добро пожаловать!' : 'Необходимо авторизоваться'}</h1>
    </section>
  );
};

export default StartingPageContent;
