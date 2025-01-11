import { createContext, Dispatch, useContext, useEffect, useState } from "react";
import { userContext } from "./Home";
import { Avatar,Button, Stack } from "@mui/material";
import UserUpdate from "./UserUpdate";

export const useContextSet = createContext<[boolean, Dispatch<boolean>]>([
  false,
  () => {},
]);
function UserName() {
  const [open, setopen] = useState(false);
  const [user] = useContext(userContext);

  // const style = {
  //   width: 100,
  // };
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar({ name=user.FullName }: { name: string }) {
    if (!name || name.trim() === "") {
      console.warn("Invalid name passed to stringAvatar:", name);
      return {
        sx: {
          bgcolor: stringToColor("Unknown"),
        },
        children: "?",
      };
    }
  
    const parts = name.split(" ");
    const firstInitial = parts[0]?.[0] || ""; // אם אין מילה ראשונה, מחזיר מחרוזת ריקה
    const secondInitial = parts[1]?.[0] || ""; // אם אין מילה שנייה, מחזיר מחרוזת ריקה
  
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstInitial}${secondInitial}` || "?",
    };
  }

  useEffect(() => {
    console.log("User state in UserName:", user);
  }, [user]); // useEffect יופעל בכל פעם שהמשתנה user מתעדכן

  return (
    <>
      <h1> Hi </h1>
      <Stack direction="row" spacing={2}>
        <h2>{user.FullName}</h2>
        <Avatar {...stringAvatar({ name: user.FullName})} />
      </Stack>
      <hr />
      <hr />
      <Button size="large" variant="outlined" onClick={() => setopen(!open)}>
        עדכון
      </Button>
      <useContextSet.Provider value={[open, setopen]}>
        {open && <UserUpdate />}
      </useContextSet.Provider>
      {/* {open && <UserUpdate/>} */}
    </>
  );
}

export default UserName;
