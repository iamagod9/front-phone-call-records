import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NotFoundPage from '../pages/404';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/404');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
