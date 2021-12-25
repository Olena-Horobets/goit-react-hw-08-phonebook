import 'App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicRoute } from 'components/PublicRoute';
import { PrivateRoute } from 'components/PrivateRoute';

import { RegisterView } from 'views/RegisterView/RegisterView';
import { LogInView } from 'views/LogInView/LogInView';
import { ContactsView } from 'views/ContactsView/ContactsView';
import { Header } from 'components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer theme="light" icon={true} limit={1} />
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/register"
              exact
              element={
                <PublicRoute restricted navigateTo="/">
                  <RegisterView toast={toast} />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/login"
              exact
              element={
                <PublicRoute restricted navigateTo="/">
                  <LogInView toast={toast} />
                </PublicRoute>
              }
            ></Route>

            <Route
              path="/"
              exact
              element={
                <PrivateRoute navigateTo="/login">
                  <ContactsView toast={toast} />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export { App };
