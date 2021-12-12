import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Admin from 'src/pages/AdminList'
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import CategoryList from 'src/pages/CategoryList'
import AddResource from 'src/components/products/AddProduct';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'category', element: <CategoryList /> },

      { path: 'account', element: <Account /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'products/addproducts', element: <AddResource /> },
      { path: 'customers', element: <Admin /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;

export const unAuthorisedroutes = [{
  path: '/',
  element: <MainLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '404', element: <NotFound /> },
    { path: '/', element: <Navigate to="/login" /> },
    { path: '*', element: <Navigate to="/login" /> }
  ]
}]
