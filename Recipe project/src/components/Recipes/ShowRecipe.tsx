import { Box, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import recipeStore from "./Stor/recipeStore";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import CheckIcon from "@mui/icons-material/Check";
import { observer } from "mobx-react-lite";

const ShowRecipe = observer(() => {
  const { id } = useParams();
  let recipe = recipeStore.getRecipeById(Number(id));

  return (
    <>
      <Box
        sx={{
          width: "90%", maxWidth: "550px", padding: "2rem",
          bgcolor: "rgb(255, 254, 250)", borderRadius: "3px",
          boxShadow: "0px 8px rgba(255, 221, 0, 0.97)",
          position: "absolute", top: "12%", left: "25%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "flex-start",
          gap: "1.2rem", textAlign: "left", color: "#FF8F00",
          borderTop:"9px solid rgba(255, 221, 0, 0.97)"
        }}>     
        {!recipe ? (
          <Box>
            <Typography sx={{ marginTop: 2, color: "#FFA000", fontSize: "1.3rem" }}>
              טוען מתכון...</Typography>
          </Box>) :          
            (<Box sx={{ padding: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom
                sx={{
                  color: "#FFA000", fontWeight: "bold", fontSize: "2rem",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                }}>
                {recipe!.title}
                <RestaurantIcon sx={{ color: "#FFA000", fontSize: "2.2rem" }} />
              </Typography>

              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "rgba(255, 208, 0, 0.93)", fontSize: "1.1rem" }}
              >
                <strong>תיאור:</strong> {recipe!.description}
              </Typography>

              <Divider sx={{ marginBottom: "20px", backgroundColor: "rgba(255, 217, 0, 0.97)" }} />

              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: "1.2rem", color: "rgba(255, 208, 0, 0.93)" }}
              >
                <strong>מצרכים:</strong>
              </Typography>

              <Box
                sx={{
                  marginBottom: "20px", display: "flex",
                  flexDirection: "column", gap: "0.5rem"
                }}>

                {Array.isArray(recipe!.ingredients) ? (
                  recipe!.ingredients.map((ingredient, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        display: "flex", alignItems: "center", color: "rgba(255, 208, 0, 0.93)",
                        fontSize: "1rem"
                      }}>

                      <CheckIcon sx={{ color: "rgba(255, 208, 0, 0.93)", marginLeft: "8px" }} />
                      {ingredient}
                    </Typography>
                  ))
                ) : (
                  <Typography>{recipe!.ingredients}</Typography>
                )}
              </Box>

              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: "1.2rem", color: "rgba(255, 208, 0, 0.93)" }}>
                <strong>הוראות הכנה:</strong> {recipe!.instructions}
              </Typography>

              <Box
                sx={{
                  display: "flex", alignItems: "center", justifyContent: "flex-end",
                  marginTop: 1,
                }}>
                <EmojiFoodBeverageIcon sx={{ color: "rgba(255, 208, 0, 0.93)" }} />
                <Typography
                  variant="h6"
                  sx={{ marginRight: 1, color: "rgba(255, 208, 0, 0.93)" }}
                >
                  בתיאבון!
                </Typography>
              </Box>
            </Box>
          )}
      </Box>
    </>
  );
});

export default ShowRecipe;
