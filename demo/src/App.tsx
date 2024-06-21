import { KeepAliveLayout, useKeepOutlets } from '@@/plugin-keepalive';
import { ProviderWrapper } from '@@/plugin-model/runtime';
import routes from '@@/routes';
import { Suspense } from 'react';
import { HashRouter, Link, useRoutes } from 'react-router-dom';
function Layout() {
  const outlets = useKeepOutlets();
  return <>{outlets}</>;
}
function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: routes.map((route) => ({
        path: route.path,
        element: <route.component />,
      })),
    },
  ]);
  return <>{element}</>;
}
function App() {
  return (
    <div>
      <HashRouter>
        <ProviderWrapper>
          <p>That pages state is keepalive!</p>
          <p>Routes:</p>
          <ul>
            {routes.map((route) => (
              <li>
                <Link to={route.path} key={route.path}>
                  {route.path}
                </Link>
              </li>
            ))}
          </ul>
          <KeepAliveLayout>
            <Suspense>
              <Routes />
            </Suspense>
          </KeepAliveLayout>
        </ProviderWrapper>
      </HashRouter>
    </div>
  );
}

export { App };
