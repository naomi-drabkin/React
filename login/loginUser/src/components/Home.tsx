import {
  Box,
  Button,
  responsiveFontSizes,
  TextField,
  TypeAction,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  FormEvent,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import UserName from "./UserName";

export type User = {
  FullName: string;
  Passowrd: string;
  Email: string;
  Address: string;
  Phone: string;
};

export type Action = {
  type: "CREATE" | "UPDATE" | "DELETE";
  data: Partial<User>;
};
export const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "1px solid grey",
  p: 4,
  borderRadius: "8px",
};

const buttonStyle = {
  position: "absolute",
  top: "3%",
  left: "2%",
};

const userReducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "CREATE":
      return { ...state, ...action.data };
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

const Home = () => {
  const [openModal, setopenModal] = useState(false);
  const [openUser, setopenUser] = useState(false);
  const [user, UserDispatch] = useReducer(userReducer, {} as User);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setopenUser(true);
    UserDispatch({
      type: "CREATE",
      data: {
        FullName: nameRef.current?.value,
        Passowrd: passwordRef.current?.value,
      },
    });
    setopenModal(false);
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setopenModal(false)}>
        <Box sx={styleModal}>
          <form action="" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Full Name"
              variant="outlined"
              inputRef={nameRef}
              required
            ></TextField>

            <TextField
              id="outlined-basic"
              type="password"
              label="password"
              variant="outlined"
              inputRef={passwordRef}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              התחברות
            </Button>
          </form>
        </Box>
      </Modal>

      <userContext.Provider value={[user, UserDispatch]}>
        {openUser ? (
          <UserName />
        ) : (
          <Box>
            <h1>HOME 💔</h1>
            <Button
              sx={buttonStyle}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setopenModal(true)}
            >
              Login
            </Button>
          </Box>
        )}
      </userContext.Provider>
    </>
  );
};

export default Home;
