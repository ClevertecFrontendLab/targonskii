import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ children }) => {
    // const user = Cookies.get('token');
    const user = true;

    if (!user) {
        return <Navigate to='/auth' />;
    }

    return children;
};
