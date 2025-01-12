import { Box, Button, Modal, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { idContext, userContext } from "./Home";
import { useContextSet } from "./UserName";
import { styleModal } from "./LoginUser";
import axios from "axios";
// import { setopen } from "./UserName";

const UserUpdate = () => {
  const [openModal, setopenModal] = useState(true);
  const [open, setopen] = useContext(useContextSet);
  const [useUpdate, useUpdateDispatch] = useContext(userContext);
  // const idCreate = useContext(idContextCreate);
  // const idLogin = useContext(idContextLogin);
  const [id, setid] = useContext(idContext);

  const nameRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/api/user",
        {
          FullName: nameRef.current?.value || useUpdate.FullName,
          Email: emailRef.current?.value || useUpdate.Email,
          Address: addressRef.current?.value || useUpdate.Address,
          Phone: phoneRef.current?.value || useUpdate.Phone,
        },
        { headers: { "user-id": id + "" } }
      );
      useUpdateDispatch({
        type: "UPDATE",
        data: {
          FullName: nameRef.current?.value || useUpdate.FullName,
          Email: emailRef.current?.value || useUpdate.Email,
          Address: addressRef.current?.value || useUpdate.Address,
          Phone: phoneRef.current?.value || useUpdate.Phone,
        },
      });

      console.log("id: " + id);
      setopenModal(false);
      setopen(false);
    } catch (e: any) {
      if (
        (e.response && e.response.status === 403) ||
        e.response.status === 400
      )
        alert("User not found");
      console.log(e);
    }
  };

  return (
    <>
      <Modal open={openModal}>
        <Box component="section" sx={styleModal}>
          <form action="" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="FullName"
              variant="outlined"
              inputRef={nameRef}
            />
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              type="email"
              inputRef={emailRef}
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              type="Address"
              inputRef={addressRef}
            />
            <TextField
              id="outlined-basic"
              label="phone"
              variant="outlined"
              inputRef={phoneRef}
            />
            <Button variant="outlined" type="submit">
              Login user
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UserUpdate;
