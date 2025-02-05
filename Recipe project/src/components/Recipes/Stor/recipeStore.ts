import axios from "axios";
import { makeAutoObservable } from "mobx";

export type Recipe = {
  id: number;
  title: string;
  description: string;
  instructions: string;
  ingredients: string[];
};

class RecipeStore {
  IsLogin: number = -1;
  userID:number = 0;
  recipeList: Recipe[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async getList() {
    try {
      const res = await axios.get("http://localhost:3000/api/recipes", {});
      console.log(res.data);

      this.recipeList = res.data || [];
    } catch (e: any) {
      if (
        (e.response && e.response.status === 401) ||
        e.response.status === 400
      )
        alert("העלאת המתכונים נכשלה");
      console.log(e);
    }
  }

  getRecipeById(id: number){
    return this.recipeList.find(recipe => recipe.id === id);     
  }

  async addRecipe(recipe:any) {
    const data = JSON.parse(recipe);    
    try {
      const res = await axios.post(
        "http://localhost:3000/api/recipes",        
          data,
        { headers: { "user-id": this.userID + "" } }
      );
      this.recipeList.push(res.data.recipe);
    } catch (e: any) {
      if (
        (e.response && e.response.status === 403) ||
        e.response.status === 400
      )
        console.log(e);
    }
  }
}

export default new RecipeStore();
