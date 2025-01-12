import { createContext, Dispatch, SetStateAction, useReducer, useState } from "react";
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

export const idContext = createContext<[Number, Dispatch<SetStateAction<Number>>]>([
  0,
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
  const [id, setid] = useState<Number>(0);

  const handleSubmit = () => {
    setloginUser(true);
    console.log("אני פה");
  };

  return (
    <>
      <userContext.Provider value={[user, UserDispatch]}>
        <>
          <idContext.Provider value={[id, setid]}>
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
          </idContext.Provider>
        </>
      </userContext.Provider>
    </>
  );
};
export default Home;
