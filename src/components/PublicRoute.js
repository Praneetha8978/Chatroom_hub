import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import { ProContext } from '../context/ProfileContext';
import { Container, Loader } from 'rsuite';

const PublicRoute = () => {
  const { profile, isLoading } = useContext(ProContext);

  useEffect(() => {
    if (!isLoading && profile) {
      // Redirect to the home page
      Navigate('/');
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

  // Render the Sign In component if the user is not authenticated
  return profile ? null : <SignIn />;
};

export default PublicRoute;