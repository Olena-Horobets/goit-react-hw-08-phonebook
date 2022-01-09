import 'App.css';
import { lazy, Suspense, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from 'components/PublicRoute';
import { PrivateRoute } from 'components/PrivateRoute';

import { useDispatch } from 'react-redux';
import { store } from './store/store';
import { setUser } from 'store/auth/auth-slice';
import { useGetCurrenthUserQuery } from 'store/auth/authAPI';

import { Loader } from 'components/Loader/Loader';
import { Header } from 'components/Header/Header';
import { HomeView } from 'views/HomeView/HomeView';

const RegisterView = lazy(() =>
  import(
    './views/RegisterView/RegisterView.js' /* webpackChunkName: "register-view" */
  ),
);
const LogInView = lazy(() =>
  import('./views/LogInView/LogInView.js' /* webpackChunkName: "login-view" */),
);
const ContactsView = lazy(() =>
  import(
    './views/ContactsView/ContactsView.js' /* webpackChunkName: "contacts-view" */
  ),
);
const BinContactsList = lazy(() =>
  import(
    './components/BinContactsList/BinContactsList.js' /* webpackChunkName: "bin-contacts-list" */
  ),
);
const ContactForm = lazy(() =>
  import(
    './components/ContactForm/ContactForm.js' /* webpackChunkName: "contact-form" */
  ),
);
const Section = lazy(() =>
  import('./components/Section/Section.js' /* webpackChunkName: "section" */),
);

function App() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetCurrenthUserQuery();

  useEffect(() => {
    const token = store.getState().auth?.token;

    if (!token && !data) return;
    else dispatch(setUser({ user: data, token }));
  }, [data, dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer theme="light" icon={true} limit={1} autoClose={2500} />
        <Header />
        <div className="container">
          <Suspense
            fallback={<Loader size={100} color={'rgba(1, 107, 110, 0.1)'} />}
          >
            {!isFetching ? (
              <Routes>
                <Route path="/" element={<HomeView />} />
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
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            ) : (
              <Loader size={100} color={'rgba(1, 107, 110, 0.1)'} />
            )}
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export { App };
