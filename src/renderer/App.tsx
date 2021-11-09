import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'tailwindcss/tailwind.css';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}
