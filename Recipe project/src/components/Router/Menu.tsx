import { createContext, Dispatch, useReducer, useState } from "react";
import LoginUser, { Action, User } from "../Login/LoginUser";
import CreateUser from "../Login/CreateUser";
import UserName from "../Login/UserName";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Box, Button } from "@mui/material";
import AddRecipe from "../Recipes/AddRecipe";
import recipeStore from "../Recipes/Stor/recipeStore";

const userReducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "CREATE":
      return { ...state, ...action.data };
    case "LOGIN":
      return { ...state, ...action.data };
    case "UPDATE":
      return { ...state, ...action.data };
    default: return state;
  }
};

export const UserContext = createContext<[User, Dispatch<Action>]>([
  {} as User,
  () => { },
]);

export const initialUser: User = {
  firstName: "", lastName: "", email: "",
  password: "", address: "", phone: ""
};

const Menu = () => {
  const [user, UserDispatch] = useReducer(userReducer, initialUser);
  const [loginUser, setloginUser] = useState(false);

  const handleSubmit = () => {
    setloginUser(true)
  };

  return (
    <>   
      <UserContext value={[user, UserDispatch]}>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            sx={{
              width: "100vw", bgcolor: "rgb(255, 255, 255)",
              color: "white", boxShadow: "none"
            }}>
            <Toolbar
              sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", px: 4
              }}>
              <div
                style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                {!loginUser ? (
                  <>
                    <Button
                      startIcon={<LoginIcon />}
                      sx={{
                        color: "rgb(255, 188, 2)",
                        fontWeight: "bold", "&:hover": {
                          color: "rgba(254, 127, 0, 0.9)"
                        }
                      }}>
                      <LoginUser CheckLoginUser={handleSubmit} />
                    </Button>
                    <Button
                      startIcon={<HowToRegIcon />}
                      sx={{
                        color: "rgb(255, 188, 2)",
                        fontWeight: "bold",
                        "&:hover": { color: "rgba(254, 127, 0, 0.9)" }
                      }}>
                      <CreateUser CheckLoginUser={handleSubmit} />
                    </Button>
                  </>
                ) : (<UserName />)}
              </div>
              <div style={{ display: "flex", gap: "2rem" }}>
                {recipeStore.IsLogin != -1 && <AddRecipe />}

                <Button
                  component={Link} to="/allRecipes"
                  sx={{
                    color: "rgb(255, 188, 2)",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontFamily: "inherit",
                    "&:hover": { color: "rgba(254, 127, 0, 0.9)" },
                  }}
                >
                  Recipes
                </Button>
                <Button component={Link} to="/about"
                  sx={{
                    color: "rgb(255, 188, 2)", fontSize: "1rem",
                    fontWeight: "bold", textTransform: "none",
                    fontFamily: "inherit",
                    "&:hover": { color: "rgba(254, 127, 0, 0.9)" },
                  }}> About  </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </UserContext>
    </>
  );
};
export default Menu;
