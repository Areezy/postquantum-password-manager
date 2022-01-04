import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import { AppContextProvider } from './context/AppContext';
import ViewEntry from './pages/ViewEntry';
import FavoritesPage from './pages/FavoritesPage';
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider>
      <AppContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/newentry" component={NewEntry} />
            <Route exact path="/viewentry" component={ViewEntry} />
            <Route exact path="/favorites" component={FavoritesPage} />
          </Switch>
        </Router>
      </AppContextProvider>
    </ChakraProvider>
  );
}
