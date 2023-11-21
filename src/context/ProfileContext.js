import React,{createContext,useEffect,useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth,database} from '../misc/firebase';
import {ref,onValue,off} from 'firebase/database';


export const ProContext = createContext();
export const ProfileContext = ({children}) => {
    const [profile,setProfile] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        let userRef = null;
    
        const unsub = onAuthStateChanged(auth, (user) => {
        console.log('Auth State Changed:', user);
        if (user) {
          userRef = ref(database, `/profiles/${user.uid}`);
          const onValueChange = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
    
            if (data) {
              const { name, createdAt } = data;
              console.log(name, createdAt);
              const userData = {
                name: name,
                createdAt: createdAt,
                email: user.email,
                uid: user.uid,
              };
              setProfile(userData);
            }else {
              setProfile(null);
            }
    
            setIsLoading(false);
          });
          } else {
            if (userRef) {
              off(userRef);
            }
            setProfile(null);
            setIsLoading(false);
          }
        });
    
        return () => {
          unsub();
          if (userRef) {
            off(userRef);
          }
        };
      }, []);

    return(
        <div>
            <ProContext.Provider value = {{profile,isLoading}}>
                {children}
            </ProContext.Provider>
        </div>
    )
}
