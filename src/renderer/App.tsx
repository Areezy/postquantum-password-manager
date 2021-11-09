import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './MainPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
}
