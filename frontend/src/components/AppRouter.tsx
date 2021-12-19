import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { privateRoutes, publicRoutes, RouteNames } from "../routes-config";
import { uniqueId } from "lodash";
import { useAuth } from "../services/auth-service";

const App: FC = () => {
  return (
    <Router>
      {
        <Routes>
          {privateRoutes.map((route) => (
            <Route
              key={uniqueId()}
              path={route.path}
              element={
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              }
            />
          ))}
          {publicRoutes.map((route) => (
            <Route
              key={uniqueId()}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      }
    </Router>
  );
};

export default App;

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { loggedIn } = useAuth();
  let location = useLocation();

  if (!loggedIn) {
    return <Navigate to={RouteNames.LOGIN} state={{ from: location }} />;
  }

  return children;
}
