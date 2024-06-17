import { ProviderWrapper } from '@@/model/runtime';
import routes from '@@/routes';
import { Suspense } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <ProviderWrapper>
        <HashRouter>
          {routes.map((route) => (
            <Link to={route.path} key={route.path}>
              {route.path}
            </Link>
          ))}
          <Suspense fallback="Loading...">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Suspense>
        </HashRouter>
      </ProviderWrapper>
    </div>
  );
}

export { App };
