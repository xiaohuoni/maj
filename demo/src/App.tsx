import { Suspense } from 'react';
import { HashRouter, Link, useRoutes } from 'react-router-dom';
import { RootContainer } from 'src/.maj/dva/dva';
import { KeepAliveLayout, useKeepOutlets } from 'src/.maj/keepalive';
import AlitaLayout from 'src/.maj/mobilelayout/AlitaLayout';
import { ProviderWrapper } from 'src/.maj/model/runtime';
import routes from 'src/.maj/routes';
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
    <HashRouter>
      <AlitaLayout>
        <ProviderWrapper>
          <p>That pages state is keepalive!</p>
          <p>Routes:</p>
          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                <Link to={route.path} key={route.path}>
                  {route.path}
                </Link>
              </li>
            ))}
          </ul>
          <KeepAliveLayout>
            <RootContainer>
              <Suspense>
                <Routes />
              </Suspense>
            </RootContainer>
          </KeepAliveLayout>
        </ProviderWrapper>
      </AlitaLayout>
    </HashRouter>
  );
}

export { App };
