import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

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
import MyStacks from "./pages/stacks/MyStacks";
import CreateStack from "./pages/stacks/CreateStack";
import StackDetail from "./pages/stacks/StackDetail";
import ProgressPage from "./pages/dashboard/ProgressPage";
import Unauthorized from "./pages/auth/Unauthorized";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // First time visitor check
    const hasSeenWelcomeModal = localStorage.getItem("hasSeenWelcomeModal");

    if (!hasSeenWelcomeModal) {
      setShowModal(true);
      localStorage.setItem("hasSeenWelcomeModal", "true");
    }

    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token is still valid
        await axios.get("https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch (error) {
        handleLogout();
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasSeenWelcomeModal");
    setIsAuthenticated(false);
    window.location.href = "/signin";
  };


  return (
    <Router>
      <div className={styles.App} style={{ backgroundImage: `url(${background})` }}>
        <NavBar />
        <Container>
          <Switch>
            {/* Public routes */}
            <Route exact path="/signin">
              {isAuthenticated ? <Redirect to="/dashboard" /> : <LogInForm />}
            </Route>
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/logout" render={() => <LogOutForm logout={handleLogout} />} />
            <Route exact path="/unauthorized" component={Unauthorized} />

            {/* Private routes */}
            {isAuthenticated ? (
              <>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/mystacks" component={MyStacks} />
                <PrivateRoute exact path="/mystacks/create" component={CreateStack} />
                <PrivateRoute exact path="/habit-stacking/:id" component={StackDetail} />
                <PrivateRoute exact path="/habit-stacking/:id/progress" component={ProgressPage} />
              </>
            ) : (
              <Redirect to="/signin" />
            )}

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