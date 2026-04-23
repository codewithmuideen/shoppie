import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext.jsx'

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAdmin()
  if (!isAdmin) return <Navigate to="/admin/login" replace />
  return children
}

export default ProtectedRoute
