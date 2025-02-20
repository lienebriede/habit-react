import './App.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import LogInForm from "./pages/auth/LogInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <ProfilePage />} />
          <Route exact path="/signin" render={() => <LogInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;