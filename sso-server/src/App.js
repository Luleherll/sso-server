import { Switch, Route, Router } from 'react-router-dom';
import Main from './main';
import Login from './login';
const createHistory = require('history').createBrowserHistory;

const history = createHistory({
  basename: '',
  forceRefresh: false,
  keyLength: 6,
});

function App() {
  return (
    <div className="App">
      <Router history={history} >
			<Switch>

			<Route path='/' exact component={Main} />
      <Route path='/login' exact component={Login} />
			</Switch>
		</Router>
    </div>
  );
}

export default App;
