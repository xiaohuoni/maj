import { Suspense } from 'react';
import { HashRouter, useLocation, useRoutes } from 'react-router-dom';
import { RootContainer } from 'src/.maj/dva/dva';
import { KeepAliveLayout, useKeepOutlets } from 'src/.maj/keepalive';
import AlitaLayout from 'src/.maj/mobilelayout/AlitaLayout';
import { ProviderWrapper } from 'src/.maj/model/runtime';
import routes from 'src/.maj/routes';
function Layout() {
  const outlets = useKeepOutlets();
  return <>{outlets}</>;
}
console.log(routes);
function Routes() {
  const location = useLocation();
  let element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: routes.map((route) => ({
        path: route.path,
        element: <route.component location={location} />,
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
