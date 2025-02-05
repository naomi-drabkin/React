import { Box, Button, Modal, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext} from "../Router/Menu";
import { UseContextSet} from "./UserName";
import axios from "axios";
import { styleModal } from "../Recipes/AddRecipe";
import recipeStore from "../Recipes/Stor/recipeStore";

const UserUpdate = () => {
  const [openModal, setopenModal] = useState(true);
  const [_, setopen] = useContext(UseContextSet);
  const [useUpdate, useUpdateDispatch] = useContext(UserContext);

  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(
        "http://localhost:3000/api/user",
        {
          firstName: firstRef.current?.value || useUpdate.firstName,
          lastName: lastRef.current?.value || useUpdate.lastName,
          email: emailRef.current?.value || useUpdate.email,
          address: addressRef.current?.value || useUpdate.address,
          phone: phoneRef.current?.value || useUpdate.phone,
        },
        { headers: { "user-id": recipeStore.userID + "" } }
      );
      useUpdateDispatch({
        type: "UPDATE",
        data: {
          firstName: firstRef.current?.value || useUpdate.firstName,
          lastName: lastRef.current?.value || useUpdate.lastName,
          email: emailRef.current?.value || useUpdate.email,
          address: addressRef.current?.value || useUpdate.address,
          phone: phoneRef.current?.value || useUpdate.phone,
        },
      });
      setopenModal(false);
      setopen(false);
    } catch (e: any) {
      if (
        (e.response && e.response.status === 403) ||e.response.status === 400)
          alert("User not found");
        console.log(e);
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setopenModal(!openModal)}>
        <Box component="section" sx={styleModal}>
          <form action="" onSubmit={handleSubmit}         
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              id="outlined-basic" label="First Name"            
              variant="outlined" inputRef={firstRef} fullWidth             
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />
            <TextField
              id="outlined-basic" label="Last Name"      
              variant="outlined" inputRef={lastRef}fullWidth                            
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />
            <TextField
              id="outlined-basic" label="Email" variant="outlined"
              type="email" inputRef={emailRef} fullWidth
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />
            <TextField
              id="outlined-basic" label="Address" variant="outlined"
              inputRef={addressRef} fullWidth
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />
            <TextField
              id="outlined-basic" label="Phone" variant="outlined"
              inputRef={phoneRef} fullWidth
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />
            <Button
              variant="contained" type="submit" fullWidth
              sx={{
                mt: 2, bgcolor: "rgb(255, 189, 22)",
                "&:hover": { bgcolor: "rgba(255, 188, 73, 0.9)" },
                color: "white", borderRadius: "1px", padding: "10px 20px",
              }}>
              update User
            </Button></form> </Box>
      </Modal>
    </>
  );
};

export default UserUpdate;
