import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { 
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import axios from "axios";
import {idContext, userContext } from "./Home";

export type User = {
  FullName: string;
  Password: string;
  Email: string;
  Address: string;
  Phone: string;
};

export type Action = {
  type: "CREATE" | "UPDATE" | "LOGIN" | "DELETE";
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


const LoginUser = ({onclick}:{onclick:Function}) => {

  const [openModal, setopenModal] = useState(false);

  const [user, UserDispatch] = useContext(userContext);
  const [id, setid] = useContext(idContext);

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        FullName: nameRef.current?.value,
        Password: passwordRef.current?.value,
      });
      onclick();
     setid(res.data.user.id);
       UserDispatch({
        type: "LOGIN",
        data: {
          FullName: nameRef.current?.value,
          Password: passwordRef.current?.value,
        }
      });
      
      console.log("User state after dispatch:", user); // וודא שה-user מתעדכן
      // setopenUser(true);

    } catch (e: any) {
      if (e.response && e.response.status === 401||e.response.status === 400)
        alert("שם או סיסמא לא תקינים");
      console.log(e);
    }

    setopenModal(false);

  };

  return (
    <>
      <Modal open={openModal} onClose={() => setopenModal(false)}>
        <Box sx={styleModal}>
          <form action="" onSubmit={handleSubmit}>
            <TextField
              id="name"
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


          <Box>           
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
        
    </>
  );
};

export default LoginUser;
