import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Home from "./components/Home/Home";
import Session from "./components/Ticket/Session";
import Seats from "./components/Ticket/Seats";
import NavBar from "./components/NavBar/NavBar";
import Management from "./components/Management/Management";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useAxiosInterceptor } from "./helpers/axios_helper";
import ErrorDialog from "./components/Error/ErrorDialog";
import AdminRoute from "./components/auth/AdminRoute";
import Summary from "./components/Ticket/Summary";
import Particle  from "./components/Particle/Particle";
import './App.css';

function App() {
  const { error, setError } = useAxiosInterceptor();

  const handleClose = () => {
    setError(null);
  };

  return (
    <div style={{display:'flex', flexDirection:'column',height:'100vh'}}>

      <Particle id="particle" />
      <BrowserRouter>
        <ErrorDialog error={error} onClose={handleClose}></ErrorDialog>
        <NavBar />
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/cinemaManagement"
            element={
              <AdminRoute>
                <Management />
              </AdminRoute>
            }
          ></Route>
          <Route
            exact
            path="/movies/:movieId"
            element={<MovieDetail />}
          ></Route>
          <Route
            exact
            path="/movies/:movieId/sessions"
            element={<Session />}
          ></Route>
          <Route
            exact
            path="/movies/sessions/:sessionId/seats"
            element={<Seats />}
          ></Route>
          <Route
            exact
            path="/movies/sessions/:sessionId/seats/summary"
            element={<Summary />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
