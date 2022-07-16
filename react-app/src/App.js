import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import UpcomingPage from './components/UpcomingPage';
import FolderDetailsPage from './components/FolderDetailsPage';
import ActivityDetailsPage from './components/ActivityDetailsPage';
import SplashPage from './components/SplashPage';
import HistoryPage from './components/HistoryPage';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
          <Footer />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
          <Footer />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
          <Footer />
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/upcoming' exact={true} >
          <UpcomingPage />
        </ProtectedRoute>
        <ProtectedRoute path='/history' exact={true} >
          <HistoryPage />
        </ProtectedRoute>
        <ProtectedRoute path='/folders/:id' exact={true} >
          <FolderDetailsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/activities/:id' exact={true} >
          <ActivityDetailsPage />
        </ProtectedRoute>
        <PageNotFound />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
