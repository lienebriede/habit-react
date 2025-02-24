import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import background from "./assets/background.png";
import LogInForm from "./pages/auth/LogInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import ProfilePage from './pages/profile/ProfilePage';
import LogOutForm from "./pages/auth/LogOutForm";
import Dashboard from './pages/dashboard/Dashboard';
import WelcomeModal from './components/WelcomeModal';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Check if user is authenticated and seen the welcome modal
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (!localStorage.getItem("hasSeenWelcomeModal")) {
      setShowModal(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("hasSeenWelcomeModal");
  };

  return (
    <Router>
      <div className={styles.App} style={{ backgroundImage: `url(${background})` }}>
        <NavBar />
        <Container>
          <Switch>
            {/* Public routes */}
            <Route exact path="/signin" render={() => (isAuthenticated ? <Redirect to="/dashboard" /> : <LogInForm />)} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/logout" render={() => <LogOutForm logout={handleLogout} />} />

            {/* Private routes (logged-in users) */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />

            {/* Redirect everything else to login */}
            <Route render={() => <Redirect to="/signin" />} />
          </Switch>

          {/* Show Welcome Modal only for first-time users */}
          {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}
        </Container>
      </div>
    </Router>
  );
}

export default App;