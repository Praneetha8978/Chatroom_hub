import React,{useContext} from 'react';
import {Navigate} from 'react-router-dom';
import SignIn from '../pages/SignIn';
import { ProContext } from '../context/ProfileContext';
import {Container,Loader} from 'rsuite';


const PublicRoute = () => {
    
    const {profile,isLoading} = useContext(ProContext);

    if(isLoading && !profile){
        return (
            <div>
                <Container>
                    <Loader center vertical size="md" content="Loading..." speed="slow" />
                </Container>
            </div>
        );
    }
    if(!isLoading && profile){
        return <Navigate to = "/"/>
    }
    return (
        <div>
            {profile ? <Navigate to="/"/> : <SignIn/>}
        </div>
    );
};

export default PublicRoute;