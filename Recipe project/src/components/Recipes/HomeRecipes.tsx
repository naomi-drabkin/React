import {Box,Grid,List,ListItemButton,ListItemIcon,ListItemText,} from "@mui/material";
import { useEffect } from "react";
import recipeStor, { Recipe } from "./Stor/recipeStore";
import { observer } from "mobx-react-lite";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Outlet, useNavigate } from "react-router-dom";

const HomeRecipes = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = (recipe: Recipe) => {
    navigate(`showRecipe/${recipe.id}`);
  };

  useEffect(() => {
    recipeStor.getList();
  }, []);

  return (
    <>
      <div style={{}}></div>
      <Box
        sx={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          position: "absolute",
          right: 80,
          top: "100px",
        }}
      >
        <Grid xs={4}>
          <List
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.5)",
              direction: "rtl",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "8px",
              borderRadius: "2px",
            }}
          >
            {recipeStor.recipeList.map((r, i) => (
              <ListItemButton
                key={i}
                onClick={() => handleSubmit(r)}
                sx={{
                  bgcolor: "rgba(255, 193, 7, 0.2)",
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: "rgba(255, 193, 7, 0.2)",
                  },
                }}
              >
                <ListItemIcon>
                  <RestaurantIcon sx={{ color: "#FFA000" }} />{" "}
                </ListItemIcon>
                <ListItemText
                  primary={r.title}
                  sx={{
                    textAlign: "right",
                    fontSize: "1rem",
                    color: "#333",
                    fontWeight: "500",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
      </Box>
      <Grid xs={8}>
        <Outlet />
      </Grid>
    </>
  );
});

export default HomeRecipes;
