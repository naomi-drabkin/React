import { Box, Button, Modal, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { styleModal, userContext } from "./Home";
import { useContextSet } from "./UserName";
// import { setopen } from "./UserName";

const UserUpdate = () => {
  const [openModal, setopenModal] = useState(true);
  const [open, setopen] = useContext(useContextSet);
  const [useUpdate, useUpdateDispatch] = useContext(userContext);

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    useUpdateDispatch({
      type: "UPDATE",
      data: {
        FullName: nameRef.current?.value,
        Passowrd: passwordRef.current?.value,
        Email: emailRef.current?.value,
        Address: addressRef.current?.value,
        Phone: phoneRef.current?.value,
      },
    });
    setopenModal(false);
    setopen(false);
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
              required
            />
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              type="email"
              inputRef={emailRef}
              required
            />
            <TextField
              id="outlined-basic"
              label="paasword"
              variant="outlined"
              type="password"
              inputRef={passwordRef}
              required
            />
            <TextField
              id="outlined-basic"
              label="phone"
              variant="outlined"
              inputRef={phoneRef}
              required
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
