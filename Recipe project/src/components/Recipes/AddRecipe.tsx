import { Box, Button, Modal, TextField, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, array } from "yup";
import recipeStore from "./Stor/recipeStore";
import { Add, Delete } from "@mui/icons-material";

export const styleModal = {
  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
  width: 400, bgcolor: "white", boxShadow: 24, p: 4, borderRadius: "3px"
};

const template = object({
  title: string().required(),
  description: string().required(),
  ingredients: array().of(string().required()).min(1, "יש להוסיף לפחות רכיב אחד"),
  instructions: string().required()
}).required();

const AddRecipe = observer(() => {
  const [openYUP, setOpenYUP] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const { formState: { errors }, register, handleSubmit, reset } = useForm({ resolver: yupResolver(template) });
  const handleIngredientChange = (index: number, value: string) => { const updatedIngredients = [...ingredients]; updatedIngredients[index] = value; setIngredients(updatedIngredients); };
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index: number) => { if (ingredients.length > 1) setIngredients(ingredients.filter((_, i) => i !== index)); };
  const onSubmit = (data: any) => { const recipe = { title: data.title, description: data.description, ingredients, instructions: data.instructions }; recipeStore.addRecipe(JSON.stringify(recipe)); reset(); setIngredients([""]); setOpenYUP(!openYUP); };

  return (
    <>
      <Button
        onClick={() => setOpenYUP(!openYUP)}
        sx={{
          color: "rgb(255, 188, 2)", fontSize: "1rem", fontWeight: "bold",
          textTransform: "none", fontFamily: "inherit",
          "&:hover": { color: "rgba(254, 127, 0, 0.9)" }
        }}>
        Add Recipe
      </Button>

      <Modal
        open={openYUP} onClose={() => setOpenYUP(!openYUP)}>
        <Box sx={styleModal}><form onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          <TextField
            label="Title" variant="outlined" fullWidth {...register("title")}
            error={!!errors.title} helperText={errors.title?.message}
            sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }} />

          <TextField
            label="Description" variant="outlined" fullWidth multiline
            rows={3} {...register("description")} error={!!errors.description}
            helperText={errors.description?.message} sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: "bold", color: "#FF8F00", fontSize: "1.1rem" }}>
              Ingredients:
            </label>

            {ingredients.map((ingredient, index) =>
            (<Box key={index} sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

              <TextField variant="outlined" fullWidth value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                error={!!errors.ingredients}
                helperText={index === ingredients.length - 1 ? errors.ingredients?.message : ""}
                sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }} />

              <IconButton
                onClick={() => removeIngredient(index)} sx={{ color: "#FF8F00" }}>
                <Delete />
              </IconButton>

            </Box>))}

            <Button
              onClick={addIngredient} startIcon={<Add />}
              sx={{
                color: "#FF8F00", fontSize: "0.9rem", textTransform: "none",
                "&:hover": { color: "rgba(254, 127, 0, 0.9)" }
              }}>
              הוסף רכיב
            </Button>
          </Box>
          <TextField
            label="Instructions" variant="outlined" fullWidth multiline
            rows={4} {...register("instructions")} error={!!errors.instructions}
            helperText={errors.instructions?.message}
            sx={{ bgcolor: "rgba(173, 216, 230, 0.2)" }} />

          <Button
            type="submit" variant="contained" fullWidth
            sx={{
              mt: 2, bgcolor: "rgb(255, 189, 22)",
              "&:hover": { bgcolor: "rgba(254, 127, 0, 0.9)" },
              color: "white", borderRadius: "1px"
            }}>
            Send
          </Button>
        </form>
        </Box>
      </Modal>
    </>
  );
});

export default AddRecipe;
