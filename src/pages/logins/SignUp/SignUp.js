import React, { useState } from 'react'
import styles from './SignUp.module.css';
import InputControl from '../InputControl/InputControl';
import {Link,useNavigate} from 'react-router-dom';
import {auth} from '../../../misc/firebase';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import '../../../pages/Logins.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    name : "",
    email : "",
    pass : ""
  })

  const[errorMsg,setErrorMsg] = useState("");

  const[submitButtonDisabled,setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if(!values.name || !values.email || !values.pass){
      setErrorMsg("Fill all the fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    console.log(values);
    createUserWithEmailAndPassword(auth,values.email,values.pass).then(async(res) => {
      setSubmitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user,{
        displayName : values.name
      });
      setErrorMsg("");
      
    }).catch((err)=>{
      setSubmitButtonDisabled(false)
      setErrorMsg(err.message);
    })
  }
  
  return (
    
      <div className={styles.container}>
        <div className={styles.innerBox}>
            <h1 className={styles.heading}>SignUp</h1>
            <InputControl label = "Name" placeholder = "Enter your name" onChange={(event)=>
       setValues((prev)=>({...prev,name:event.target.value}))
       }/>
            <InputControl label = "Email" placeholder = "Enter email address" onChange={(event)=>
       setValues((prev)=>({...prev,email:event.target.value}))
       }/>
            <InputControl label = "Password" placeholder = "Enter password" onChange={(event)=>
       setValues((prev)=>({...prev,pass:event.target.value}))
       }/>
            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button onClick={handleSubmission} disabled = {submitButtonDisabled}>SignUp</button>
                <p>Already have an account?{" "}
                <span><Link to = "/login">LogIn</Link></span>
                </p>
            </div>
        </div>
    </div>
    
  )
}

export default SignUp
