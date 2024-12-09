import { useEffect, FC } from "react";
import { useRoutes, useNavigate, BrowserRouter as Router, Navigate } from "react-router-dom";
import Home from "./components/Home";

const Navigation: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  // redirect 404s to home page because im too lazy to make a page for that
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return routes;
}

const App: FC = () => {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;