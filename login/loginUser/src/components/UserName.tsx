import { createContext, Dispatch, useContext, useState } from "react";
import { userContext } from "./Home";
import { Avatar, Box, Button, Stack } from "@mui/material";
import UserUpdate from "./UserUpdate";

export const useContextSet = createContext<[boolean,Dispatch<boolean>]>([false,()=>{}])
function UserName() {
  const [open,setopen]=useState(false)
  const [user,UserDispatch] = useContext(userContext);

  const style ={
    width:100
  }
  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return(    
    <>
      <Stack direction="row" spacing={2}>
        <h2>{user.FullName}</h2>
        <Avatar {...stringAvatar(user.FullName)} />      
      </Stack>
      <hr />
      <hr />
      <Button size="large" variant="outlined" onClick={()=>setopen(!open)}>עדכון</Button> 
      <useContextSet.Provider value={[open,setopen]} >
      {open && <UserUpdate/>}
      </useContextSet.Provider>    
      {/* {open && <UserUpdate/>} */}
    </>

  )
}

export default UserName;
