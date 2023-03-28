import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface WithRouterProps {
  location: ReturnType<typeof useLocation>;
  params: Record<string, string>;
  navigate: ReturnType<typeof useNavigate>;
}

const withRouter = <Props extends WithRouterProps>(Component: React.ComponentType<Props>) => {
  return (props: Omit<Props, keyof WithRouterProps>) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return (
      <Component {...(props as Props)} location={location} params={params} navigate={navigate} />
    );
  };
};

const routes: { [key: string]: string } = {
  '': 'home',
  '/': 'home',
  '/about': 'about us',
  '/form': 'form',
  '*': '404',
};

export { type WithRouterProps, withRouter, routes };
