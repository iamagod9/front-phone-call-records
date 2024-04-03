import ProtectedRoute from '../../../components/protectedRoute';
import RootLayout from '../../../layouts/RootLayout';

const Admin = () => {

  const dataString = {}

  return (
    <ProtectedRoute>
      <RootLayout>
        <h1>admin panel</h1>
      </RootLayout>
    </ProtectedRoute>
  )
} 

export default Admin