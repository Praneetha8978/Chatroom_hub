import React,{useState} from 'react'
import styles from './LogIn.module.css';
import InputControl from '../InputControl/InputControl';
import {Link,useNavigate} from 'react-router-dom';
import {auth,database} from '../../../misc/firebase';
import {signInWithEmailAndPassword,updateProfile} from 'firebase/auth';
import {ref,set,get,serverTimestamp} from "firebase/database"

const LogIn = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    email : "",
    pass : ""
  })

  const[errorMsg,setErrorMsg] = useState("");

  const[submitButtonDisabled,setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if(!values.email || !values.pass){
      setErrorMsg("Fill all the fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    console.log(values);
    signInWithEmailAndPassword(auth,values.email,values.pass).then(async(res) => {
      setSubmitButtonDisabled(false);
      setErrorMsg("");
      const user = res.user;
      console.log("user in login"+user.displayName);
      const userRef = ref(database, `/profiles/${user.uid}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/");
    }).catch((err)=>{
      setSubmitButtonDisabled(false)
      setErrorMsg(err.message);
    })
  }
  return (
    <div className={styles.container}>
        <div className={styles.innerBox}>
            <h1 className={styles.heading}>Login</h1>
            <InputControl label = "Email" placeholder = "Enter email address" onChange={(event)=>
       setValues((prev)=>({...prev,email:event.target.value}))
       }/>
            <InputControl label = "Password" placeholder = "Enter password" onChange={(event)=>
       setValues((prev)=>({...prev,pass:event.target.value}))
       }/>
            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button onClick={handleSubmission} disabled={submitButtonDisabled}>Login</button>
                <p>Already have an account?{" "}
                <span><Link to = "/signin">LogOut</Link></span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default LogIn
