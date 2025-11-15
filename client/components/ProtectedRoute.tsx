import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuth } from '@/store/authSlice';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate('/login');
  }, [isAuth, navigate]);

  return isAuth ? <>{children}</> : null;
}
