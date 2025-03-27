import AuthGuard from '@/components/auth/AuthGuard';

const Layout = ({ children }) => {

  return (
    <>
      <AuthGuard>
        {children}
      </AuthGuard>
    </>
  );
}

export default Layout;