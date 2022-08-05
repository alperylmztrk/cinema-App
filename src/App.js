import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Home from './components/Home/Home';
import Session from './components/Ticket/Session';
import Seats from './components/Ticket/Seats';
import NavBar from './components/NavBar/NavBar';
import Management from './components/Management/Management';
import UserInfo from './components/Ticket/UserInfo';

function App() {
  return (
    <div>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/cinemaManagement" element={<Management />}></Route>
          <Route exact path="/movies/:movieId" element={<MovieDetail />}></Route>
          <Route exact path="/movies/:movieId/sessions" element={<Session />}></Route>
          <Route exact path="/movies/sessions/:assignedMovieId/seats" element={<Seats />}></Route>
          <Route exact path="/movies/sessions/:assignedMovieId/seats/userInfo" element={<UserInfo />}></Route>
        </Routes>
  
      </BrowserRouter>
    </div>
  );
}

export default App;
