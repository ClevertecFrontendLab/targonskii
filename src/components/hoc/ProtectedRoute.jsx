import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const user = false; // Временное решение, пока не буду получать пользователя.

    if (!user) {
        return <Navigate to='/auth' />;
    }

    return children ? children : <Outlet />;
};
