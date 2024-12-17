import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            if (!isAuthenticated) {
                navigate('/login?error=You must log in to access this page');
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;