import { useCallback, useState,useEffect } from "react";
import {database} from './firebase';
import {ref,onValue,off} from "firebase/database";

export function useModelState(defaultValue = false){
    const [isOpen,setIsOpen] = useState(defaultValue)

    const open = useCallback(() => setIsOpen(true),[]);
    const close = useCallback(() => setIsOpen(false),[]);

    return {isOpen,open,close}
}

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = (evt) => setMatches(evt.matches);
  
      queryList.addEventListener('change', listener);
      return () => queryList.removeEventListener('change', listener);
    }, [query]);
  
    return matches;
  };

export function usePresence(uid){
  const [presence,setPresence] = useState(null);
  useEffect(() => {
    const userStatusRef = ref(database,`/status/${uid}`);
    onValue(userStatusRef,(snapshot)=>{
      if(snapshot.exists()){
        const data = snapshot.val();
        setPresence(data);
      }
    })
    return ()=>{
      off(userStatusRef);
    }
  }, [uid]);
  return presence;
}