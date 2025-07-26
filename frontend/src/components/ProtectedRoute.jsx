import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/token';




export default function ProtectedRoute() {
    const isAuthenticated = getToken() !== null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace/>;
}
