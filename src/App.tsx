import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import { RootState } from './app/store';
import { AppRoute } from './utils/const';

function App() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Layout>
      <Routes>
        <Route path={AppRoute.Home} element={<HomePage />} />
        {!isLoggedIn && <Route path={AppRoute.Auth} element={<AuthPage />} />}
        {isLoggedIn && (
          <Route path={AppRoute.Contacts} element={<ContactsPage />} />
        )}
        <Route path='*' element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
