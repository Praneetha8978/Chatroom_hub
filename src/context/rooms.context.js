import React,{createContext, useEffect, useState} from "react";
import {database} from '../misc/firebase';
import {ref,onValue,off} from 'firebase/database';
import { transformToArrWithId } from "../misc/helper";

export const RoomsContext = createContext();


export const RoomsProvider = ({children}) => {
    const [rooms,setRooms] = useState(null);
    useEffect(()=>{
        const roomListRef = ref(database,'rooms');
        const onValueChange = onValue(roomListRef,(snapshot)=>{
            const data = transformToArrWithId(snapshot.val());
            setRooms(data);
        })
        return () => {
            off(roomListRef);
        }
    },[]);
    return(
        <div>
            <RoomsContext.Provider value = {rooms}>
                {children}
            </RoomsContext.Provider>
        </div>
    )
}