import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import { ProContext } from '../context/ProfileContext';
import { Container, Loader } from 'rsuite';

const PrivateRoute = () => {
  const { profile, isLoading } = useContext(ProContext);

  useEffect(() => {
    if (!isLoading && !profile) {
      // Redirect to the sign-in page
      Navigate('/signin');
    }
  }, [isLoading, profile]);

  if (isLoading) {
    return (
      <div>
        <Container>
          <Loader center vertical size="md" content="Loading..." speed="slow" />
        </Container>
      </div>
    );
  }

  // Render the Home component if the user is authenticated
  return profile ? <Home /> : null;
};

export default PrivateRoute;