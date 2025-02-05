import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext} from "../Router/Menu";
import { Avatar, Button, Stack } from "@mui/material";
import UserUpdate from "./UserUpdate";
import recipeStore from "../Recipes/Stor/recipeStore";

export const UseContextSet = createContext<[boolean, Dispatch<boolean>]>([
  false,
  () => {},
]);

const UserName = () => {
  const [open, setopen] = useState(false);
  const [user] = useContext(UserContext);

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
  function stringAvatar({ name = user.firstName }: { name: string }) {
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
    const firstInitial = parts[0]?.[0] || "";
    const secondInitial = parts[1]?.[0] || "";

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstInitial}${secondInitial}` || "?",
    };
  }
  useEffect(() => {
    recipeStore.IsLogin = 1;
  }, []); 
  return (
    <>
      <div style={{ display: "flex", flexWrap: "nowrap", gap: "1rem" }}>
        <Stack direction="column" spacing={2}>
          <Avatar {...stringAvatar({ name: user.firstName || user.email })} />
        </Stack>
        <hr />
        <Button
          size="large"
          variant="contained"
          onClick={() => setopen(!open)}
          sx={{bgcolor:"rgb(255, 188, 2)",color:"white"}}
        >
          עדכון
        </Button>
      </div>
      <UseContextSet value={[open, setopen]}>
        {open && <UserUpdate />}
      </UseContextSet>
    </>
  );
};


export default UserName;
