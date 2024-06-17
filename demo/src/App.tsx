import { Suspense } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
// import { ProviderWrapper } from './.mako/runtime';
import routes from './routes';
console.log(routes);
function App() {
  return (
    <div>
      {/* <ProviderWrapper> */}
      <HashRouter>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
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
      {/* </ProviderWrapper> */}
    </div>
  );
}

export { App };
