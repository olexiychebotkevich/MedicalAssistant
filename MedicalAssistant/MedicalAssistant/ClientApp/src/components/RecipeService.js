import axios from 'axios';
import {serverUrl} from '../config';
import jwt from 'jsonwebtoken';




export default class RecipeService {
   

    static AddRecipe(user,recipe) {
        console.log("-----Recipe service: recipe ",recipe);

        return axios.post(`${serverUrl}api/recipe/AddRecipe`, recipe, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });

    }

   
}