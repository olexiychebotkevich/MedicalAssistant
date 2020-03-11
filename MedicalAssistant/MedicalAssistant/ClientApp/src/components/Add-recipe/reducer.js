import RecipeService from '../../services/RecipeService';
import update from '../../helpers/update';
import { push } from 'connected-react-router';
import jwt from 'jsonwebtoken';


export const ADDRECIPE_REQUEST = "recipe/ADDRECIPE_REQUEST";
export const ADDRECIPE_SUCCESS = "recipe/ADDRECIPE_SUCCESS";
export const ADDRECIPE_FAILURE = "recipe/ADDRECIPE_FAILURE";


const initialState = {
    recipe: {
    failed: false,
    loading: false,
    success: false,
    errors:{},
    statuscode:null
    }
}



export const recipiesReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case ADDRECIPE_REQUEST: {
            newState = update.set(state, 'recipe.loading', true);
            break;
        }
        case ADDRECIPE_SUCCESS: {
            newState = update.set(state, 'recipe.loading', false);
            newState = update.set(newState, 'recipe.success', true);
            break;
        }

        case ADDRECIPE_FAILURE: {
            newState = update.set(state, 'recipe.loading', false);
            newState = update.set(newState, 'recipe.failed', true);
            newState = update.set(newState, 'recipe.errors', action.errors);
            newState = update.set(newState, 'recipe.statuscode', action.statuscode);
            break;
        }

      
        default: {
            return newState;
        }

    }
    return newState;
}



export const AddRecipe=(recipe) =>{
    const user = jwt.decode(localStorage.getItem('jwtToken'))
    const token = localStorage.getItem('jwtToken')
    return (dispatch) => {
        dispatch(recipeActions.addrecipestarted());
        RecipeService.AddRecipe({...user,token},recipe)
            .then((response) => {
                dispatch(recipeActions.addrecipestarted(response));
                dispatch(push('/doctor/pagedoctor'));
                
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(recipeActions.addrecipestarted(err.response));
            });
    }
}




export const recipeActions = {
   
    addrecipestarted: () => {
        return {
            type: ADDRECIPE_REQUEST
        }
    },
    addrecipesuccess: (data) => {
        return {
            type: ADDRECIPE_SUCCESS,
            payload: data
        }
    },
    addrecipefailed: (response) => {
        return {
            type: ADDRECIPE_FAILURE,
            errors: response.data,
            statuscode:response.status
        }
    }

}

