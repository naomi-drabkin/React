import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { UserContext} from "../Router/Menu";
import recipeStore from "../Recipes/Stor/recipeStore";
import { styleModal } from "../Recipes/AddRecipe";

export type User = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  address: string;
  phone: string;
};

export type Action = {
  type: "CREATE" | "UPDATE" | "LOGIN" | "DELETE";
  data: Partial<User>;
};

const LoginUser = ({ CheckLoginUser }: { CheckLoginUser: Function }) => {
  const [openModal, setopenModal] = useState(false);
  const [_, UserDispatch] = useContext(UserContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      CheckLoginUser();
      recipeStore.userID = res.data.user.id;
      recipeStore.IsLogin = 1;
      UserDispatch({
        type: "LOGIN",
        data: {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          address: res.data.user.address,
          phone: res.data.user.phone,
        },
      });
    } catch (e: any) {
      if (
        (e.response && e.response.status === 401) || e.response.status === 400)
        alert("שם או סיסמא לא תקינים");
      console.log(e);
    }
    setopenModal(false);
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setopenModal(false)}>
        <Box sx={styleModal}>
          <form action="" onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              id="email" type="email" label="Email"
              variant="outlined" inputRef={emailRef}
              required fullWidth
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />

            <TextField
              id="outlined-basic" type="password" label="Password"
              variant="outlined" inputRef={passwordRef}
              required fullWidth
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />

            <Button
              type="submit" variant="contained"
              fullWidth
              sx={{
                mt: 2, bgcolor: "rgb(255, 189, 22)",
                "&:hover": { bgcolor: "rgba(235, 178, 56, 0.9)" },
                color: "white", borderRadius: "1px", padding: "10px 20px",
              }}>
              התחברות
            </Button>
          </form>
        </Box>
      </Modal>

      <Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => setopenModal(true)}
          sx={{ bgcolor: "rgb(255, 189, 22)", color: "white" }}>
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginUser;
