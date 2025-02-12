import CreatePost from '../pages/Posts';
import Form from '../pages/auth/Form';
import { Navigate, Route, Routes as Router } from 'react-router-dom';
import Profile from '../pages/Profile/index';
import Others from '../pages/Others';
import Home from '../pages/Home/Index';

const PrivateRoutes = ({children}) => {
  const isUserLoggedIn = window.localStorage.getItem('user:token') || false;
  const isFormPage = window.location.pathname.includes('ac');

  if (isUserLoggedIn && !isFormPage) {
    return children;
  } else if (!isUserLoggedIn && isFormPage) {
    return children;
  } else {
    const redirectUrl = isUserLoggedIn ? '/' : '/ac/signin';
    return <Navigate to={redirectUrl} replace />;
  }
}

const Routes = () => {
  const routes = [
    { id: 1, 
      name: 'home',
      path: '/', 
      element: <Home /> 
    },
    { id: 2, 
      name: 'sign in', 
      path: '/ac/signin', 
      element: <Form /> 
    },
    { id: 3, 
      name: 'sign up', 
      path: '/ac/signup', 
      element: <Form /> 
    },
    { id: 4, 
      name: 'createPost', 
      path: '/new-post', 
      element: <CreatePost /> 
    },
    { id: 5, 
      name: 'profile', 
      path: '/profile', 
      element: <Profile /> 
    },
    { id: 6, 
      name: 'others', 
      path: '/user/:email', 
      element: <Others /> 
    }
  ];

  return (
    <Router>
      {routes.map(route => (
        <Route key={route.id} path={route.path} element={
            <PrivateRoutes>
              {route.element}
            </PrivateRoutes>}/>
      ))}
    </Router>
  );
};

export default Routes;

