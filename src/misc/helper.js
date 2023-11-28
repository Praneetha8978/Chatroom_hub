export function getNameInitials(name){
    const splitName = name.toUpperCase().split(' ');
    if(splitName.length === 2){
        return splitName[0][0] + splitName[1][0];
    }
    else if(splitName.length > 2){
        return splitName[0][0] + splitName[1][0] + splitName[2][0];
    }
    return splitName[0][0];
}