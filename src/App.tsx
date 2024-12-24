import { useEffect, FC } from "react";
import { useRoutes, useNavigate, BrowserRouter as Router, Navigate } from "react-router-dom";
import Home from "./components/Home";

const Navigation: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const routes = useRoutes([
    { path: "/old", element: <Home /> },
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