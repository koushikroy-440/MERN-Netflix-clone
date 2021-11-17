import './App.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const user = true;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
           exact path='/' element={
           user ? <Home /> : <Register/>
          }
        />
        </Routes>

        <Routes>
          <Route
           exact path='/login'
           element={
           !user ? <Login/> : <Home />
          } 
        />
        </Routes>
          
        <Routes>
          <Route
            exact path='/register'
            element={
            !user ? <Register/> : <Home />
            }
          />
        </Routes>

          <Routes>
          <Route
           exact path='/movies'
           element={
            !user ? <Register/> : <Home type='movie' />
            }
          />
          </Routes>

          <Routes>
            <Route exact path='/series'
             element={
              !user ? <Register/> : <Home type='series' />
              }
            />
          </Routes>

          <Routes>
            <Route exact path='/watch'
             element={
              !user ? <Register/> : <Watch/>
              }
            />
          </Routes>
      
      </Router>
    </div>
  );
}

export default App;
