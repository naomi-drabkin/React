import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { UserContext} from "../Router/Menu";
import recipeStore from "../Recipes/Stor/recipeStore";
import { styleModal } from "../Recipes/AddRecipe";

const CreateUser = ({ CheckLoginUser }: { CheckLoginUser: Function }) => {
  const [openModal, setopenModal] = useState(false);
  const [_, UserDispatch] = useContext(UserContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      CheckLoginUser();
      UserDispatch({
        type: "CREATE",
        data: {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        },
      });
      recipeStore.userID = res.data.userId;
      recipeStore.IsLogin = 1;
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
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              inputRef={emailRef}
              required
              fullWidth
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />

            <TextField
              type="password"
              label="Password"
              variant="outlined"
              inputRef={passwordRef}
              required
              fullWidth
              sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "rgb(255, 188, 2)", 
                "&:hover": { bgcolor: "rgba(255, 170, 0, 0.9)" },
                color: "נrgba(215, 220, 61, 0.9)",
               
                borderRadius: "1px",
                padding: "10px 20px",
              }}
            >
              התחברות
            </Button>
          </form>
        </Box>
      </Modal>

      <Box>
        <Button
          sx={{bgcolor:"rgb(255, 189, 22)",color:"white"}}
          variant="contained"
          size="large"
          onClick={() => setopenModal(true)}
        >
          register
        </Button>
      </Box>
    </>
  );
};

export default CreateUser;
