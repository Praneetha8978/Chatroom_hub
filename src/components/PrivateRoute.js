import React,{useContext} from 'react';
import {Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import { ProContext } from '../context/ProfileContext';
import {Container,Loader} from 'rsuite';


const PrivateRoute = () => {
    
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
    if(!isLoading && !profile){
        return <Navigate to = "/signin"/>
    }
    return (
        <div>
            {console.log("profile"+" "+profile)}
            {profile!=null ? <Home/> : <Navigate to="/signin"/>}
        </div>
    );
};

export default PrivateRoute;
