import { Box, Button, Modal, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { userContext } from "./Home";
import { useContextSet } from "./UserName";
import { styleModal } from "./LoginUser";
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
        FullName: nameRef.current?.value || useUpdate.FullName,
        Password: passwordRef.current?.value||useUpdate.Password,
        Email: emailRef.current?.value||useUpdate.Email,
        Address: addressRef.current?.value||useUpdate.Address,
        Phone: phoneRef.current?.value||useUpdate.Phone,
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
              label="paasword"
              variant="outlined"
              type="password"
              inputRef={passwordRef}
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
