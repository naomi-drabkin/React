import { createContext, Dispatch, useReducer, useState } from "react";
import LoginUser, { Action, User } from "./LoginUser";
import CreateUser from "./CreateUser";
import UserName from "./UserName";

const userReducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "CREATE":
      return { ...state, ...action.data };
    case "LOGIN": {
      return { ...state, ...action.data };
    }
    case "UPDATE":
      return { ...state, ...action.data };
    // case 'DELETE':
    default:
      return state;
  }
};
export const userContext = createContext<[User, Dispatch<Action>]>([
  {} as User,
  () => {},
]);

export const initialUser: User = {
  FullName: "",
  Email: "",
  Password: "",
  Address: "",
  Phone: "",
};

const Home = () => {
  const [user, UserDispatch] = useReducer(userReducer, initialUser);
  const [loginUser, setloginUser] = useState(false);

  const handleSubmit = () => {
    setloginUser(true);
    console.log("אני פה");
  };

  return (
    <>
      <userContext.Provider value={[user, UserDispatch]}>
        <>
          {!loginUser ? (
            <>
              <h1>HOME 💔</h1>
              <LoginUser onclick={handleSubmit} />
              <CreateUser onclick={handleSubmit} />
            </>
          ) : (
            <>
              <UserName />
            </>
          )}
        </>
      </userContext.Provider>
    </>
  );
};
export default Home;
