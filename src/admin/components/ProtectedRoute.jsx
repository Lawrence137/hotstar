import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        // Check for the admin custom claim.
        if (!!idTokenResult.claims.admin) {
          setIsAdmin(true);
        }
        setIsCheckingAdmin(false);
      });
    } else {
      setIsCheckingAdmin(false);
    }
  }, [user]);

  if (loading || isCheckingAdmin) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
