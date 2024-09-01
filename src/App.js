import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Home from "./components/Home/Home";
import Session from "./components/Ticket/Session";
import Seats from "./components/Ticket/Seats";
import NavBar from "./components/NavBar/NavBar";
import Management from "./components/Management/Management";
import UserInfo from "./components/Ticket/UserInfo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useAxiosInterceptor } from "./helpers/axios_helper";
import ErrorDialog from "./components/Error/ErrorDialog";
import AdminRoute from "./components/auth/AdminRoute";

function App() {
  const { error, setError } = useAxiosInterceptor();

  const handleClose = () => {
    setError(null);
  };

  return (
    <div>
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
            path="/movies/sessions/:assignedMovieId/seats"
            element={<Seats />}
          ></Route>
          <Route
            exact
            path="/movies/sessions/:assignedMovieId/seats/userInfo"
            element={<UserInfo />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
