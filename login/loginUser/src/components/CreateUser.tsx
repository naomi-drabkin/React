import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { createContext, useContext, useRef, useState } from "react";
import { idContext, userContext } from "./Home";
import { styleModal } from "./LoginUser";

const buttonStyle = {
  position: "absolute",
  top: "11%",
  left: "2%",
};

const CreateUser = ({ onclick }: { onclick: Function }) => {
  const [openModal, setopenModal] = useState(false);
  const [user, UserDispatch] = useContext(userContext);
  const [id, setid] = useContext(idContext);

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        FullName: nameRef.current?.value,
        Password: passwordRef.current?.value,
      });
      onclick();
      UserDispatch({
        type: "CREATE",
        data: {
          FullName: nameRef.current?.value,
          Password: passwordRef.current?.value,
        },
      });      
      setid(res.data.userId);
      
    } catch (e: any) {
      if (
        (e.response && e.response.status === 401) ||
        e.response.status === 400
      )
        alert("שם וסיסמא קיימים במערכת");
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
              id="outlined"
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
            הרשמה
          </Button>
        </Box>
    </>
  );
};

export default CreateUser;
