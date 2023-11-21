import React from 'react';
import {Container,Grid,Row,Col,Panel,Button} from 'rsuite';
import "../styles/main.scss";
import { GoogleAuthProvider,FacebookAuthProvider,signInWithPopup} from 'firebase/auth';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import { FaGoogle } from 'react-icons/fa';
import { auth,database } from '../misc/firebase';
import Swal from 'sweetalert2';
import { serverTimestamp } from 'firebase/database';
import { ref, set, get } from 'firebase/database';

const SignIn = () => {

  const signInWithProvider = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;
      const userRef = ref(database, `/profiles/${user.uid}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'You have successfully signed in!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Sign-in error: ${error.message}`,
      });
    }
  };
    
    const onFacebookSignIn = () => {
      const facebookProvider = new FacebookAuthProvider();
      signInWithProvider(facebookProvider);
    }
    
    const onGoogleSignIn = () => {
      const googleProvider = new GoogleAuthProvider();
      signInWithProvider(googleProvider);
    };

    return(
        <div>
            <Container>
                <Grid className='mt-page'>
                    <Row>
                        <Col xs = {24} md = {12} mdOffset={6}>
                            <Panel>
                                <div className = "text-center">
                                    <h2>Welcome To Chat</h2>
                                    <p>Progressive chat platform for neophytes</p>
                                </div>
                                <div className='mt-3'>
                                    <Button block color = "blue" appearance = "primary" startIcon = {<FacebookOfficialIcon style={{ fontSize: '2em' }}/>} onClick={onFacebookSignIn}>
                                        Continue with facebook
                                    </Button>
                                    <Button block color = "green" appearance = "primary" startIcon={<FaGoogle style={{ fontSize: '1.5em' }} />} onClick={onGoogleSignIn}>
                                        Continue with google
                                    </Button>
                                </div>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </div>
    )
}

export default SignIn;