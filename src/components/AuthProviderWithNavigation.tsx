
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

interface AuthProviderWithNavigationProps {
  children: React.ReactNode;
}

export function AuthProviderWithNavigation({ children }: AuthProviderWithNavigationProps) {
  const navigate = useNavigate();
  
  return (
    <AuthProvider navigate={navigate}>
      {children}
    </AuthProvider>
  );
}
