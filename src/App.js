import 'App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicRoute } from 'components/PublicRoute';
import { PrivateRoute } from 'components/PrivateRoute';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from './store/store';
import { setUser } from 'store/auth/auth-slice';
import { useGetCurrenthUserQuery } from 'store/auth/authAPI';

import { Loader } from 'components/Loader/Loader';
import { RegisterView } from 'views/RegisterView/RegisterView';
import { LogInView } from 'views/LogInView/LogInView';
import { ContactsView } from 'views/ContactsView/ContactsView';
import { Header } from 'components/Header/Header';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { BinContactsList } from 'components/BinContactsList/BinContactsList';
import { Section } from 'components/Section/Section';

function App() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetCurrenthUserQuery();

  useEffect(() => {
    const token = store.getState().auth.token;

    if (token && data) {
      dispatch(setUser({ user: data, token }));
    }
  }, [data, dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer theme="light" icon={true} limit={1} autoClose={2500} />
        <Header />
        <div className="container">
          {!isFetching ? (
            <Routes>
              <Route
                path="/contacts/*"
                element={
                  <PrivateRoute>
                    <ContactsView toast={toast} />
                  </PrivateRoute>
                }
              >
                <Route
                  path=""
                  element={
                    <Section
                      styledClass="newContact"
                      title="Create new contact"
                      iconName={'icon-add_ic_call'}
                    >
                      <ContactForm toast={toast} />
                    </Section>
                  }
                />
                <Route
                  path="deleted"
                  element={
                    <Section
                      styledClass="deleted"
                      title="Deleted contacts"
                      iconName={'icon-delete_sweep'}
                    >
                      <BinContactsList toast={toast} />
                    </Section>
                  }
                />
              </Route>
              <Route
                path="/register"
                element={
                  <PublicRoute restricted>
                    <RegisterView toast={toast} />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute restricted>
                    <LogInView toast={toast} />
                  </PublicRoute>
                }
              />
            </Routes>
          ) : (
            <Loader size={100} color={'rgba(1, 107, 110, 0.1)'} />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export { App };
