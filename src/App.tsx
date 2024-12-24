import { FC } from "react";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";

const Navigation: FC = () => {
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