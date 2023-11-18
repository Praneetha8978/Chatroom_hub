import React,{createContext,useEffect,useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth,database} from '../misc/firebase';
import {ref,onValue,off} from 'firebase/database';


export const ProContext = createContext();
export const ProfileContext = ({children}) => {
    const [profile,setProfile] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        let userRef = null;
        let onValueChange = null;

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                userRef = ref(database, `/profiles/${user.uid}`);
                onValueChange = onValue(userRef, (snapshot) => {
                    const {name,createdAt} = snapshot.val();
                    const data = {
                        name : name,
                        createdAt : createdAt,
                        email : user.email,
                        uid : user.uid
                    }
                    setProfile(data);
                    setIsLoading(false);
                });
            } else {
              if(userRef){
                off(onValueChange);
              }
              setProfile(null);
              setIsLoading(false);
            }
          });

          return ()=>{
            unsub();
            if(userRef){
               off(onValueChange);
            }
          }
    },[])

    return(
        <div>
            <ProContext.Provider value = {{profile,isLoading}}>
                {children}
            </ProContext.Provider>
        </div>
    )
}
