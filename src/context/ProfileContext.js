import React,{createContext,useEffect,useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth,database} from '../misc/firebase';
import {ref,onValue,off,serverTimestamp,onDisconnect,set} from 'firebase/database';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: serverTimestamp(),
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: serverTimestamp(),
};


export const ProContext = createContext();
export const ProfileContext = ({children}) => {
    const [profile,setProfile] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        let userRef = null;
        let userStatusRef;

        const unsub = onAuthStateChanged(auth, (user) => {
        console.log('Auth State Changed:', user);
        if (user) {
          console.log("userIdForRooms"+" "+user.uid);
          userStatusRef = ref(database,`/status/${user.uid}`);
          userRef = ref(database, `/profiles/${user.uid}`);
          const onValueChange = onValue(userRef, async (snapshot) => {
            const data = snapshot.val();
    
            if (data) {
              const { name, createdAt,avatar } = data;
              console.log(name, createdAt);
              const userData = {
                name: name,
                createdAt: createdAt,
                avatar : avatar,
                email: user.email,
                uid: user.uid,
              };
              setProfile(userData);
              console.log("username in pc"+" "+userData.name)
            }else {
              setProfile(null);
            }
            setIsLoading(false);
          });

          const connectedRef = ref(database, '.info/connected');
          onValue(connectedRef, (snapshot) => {
          if (!!snapshot.val() === false) {
              return;
          }
          const userStatusDatabaseRefOnDisconnect = onDisconnect(userStatusRef);
          set(userStatusDatabaseRefOnDisconnect, isOfflineForDatabase).then(() => {
              set(userStatusRef, isOnlineForDatabase);
            });
          });
          } else {
            if (userRef) {
              off(userRef);
            }
            if(userStatusRef){
              off(userStatusRef);
            }
            const connectedRef = ref(database, '.info/connected');
            off(connectedRef);
            setProfile(null);
            setIsLoading(false);
          }
        });
    
        return () => {
          unsub();
          const connectedRef = ref(database, '.info/connected');
          off(connectedRef);
          if (userRef) {
            off(userRef);
          }
          if(userStatusRef){
            off(userStatusRef);
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
