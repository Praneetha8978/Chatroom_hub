import { ref, orderByChild, equalTo, query, get } from "firebase/database";

export function getNameInitials(name){
    const splitName = name.toUpperCase().split(' ');
    if(splitName.length >= 2){
        return splitName[0][0] + splitName[1][0];
    }
    return splitName[0][0];
}

export function transformToArrWithId(snapVal){
    return snapVal ? Object.keys(snapVal).map(roomId => {
        return {...snapVal[roomId],id : roomId};
    }) :  []
}

export async function getUserUpdate(userId, keyToUpdate, value, db) {
    const updates = {};
    updates[`/profiles/${userId}/${keyToUpdate}`] = value;
  
    const messagesRef = ref(db, 'messages');
    const queryGet = query(messagesRef, orderByChild('author/uid'), equalTo(userId));
    const getMsgs = get(queryGet);

    const roomsRef = ref(db, 'rooms');
    const roomsGet = query(roomsRef, orderByChild('lastMessage/author/uid'), equalTo(userId));
    const getRooms = get(roomsGet);
    console.log(getMsgs+"and"+getRooms);
    const [mSnap,rSnap] = await Promise.all([getMsgs,getRooms]);
    mSnap.forEach(msgSnap => {
        updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
    })
    rSnap.forEach(roomSnap => {
        updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
    })
    
    return updates;
  }

  export function transformToArr(snapVal){
    return snapVal ? Object.keys(snapVal) : [];
  } 
 
  export function groupBy(array,groupingKeyFn){
    return array.reduce((result,item)=>{
        const groupingKey = groupingKeyFn(item);
        if(!result[groupingKey]){
            result[groupingKey] = [];
        }
        result[groupingKey].push(item);
        return result;
    },{})
  }
