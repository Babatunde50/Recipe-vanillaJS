const addRecipeBtn = document.getElementById("add-recipe")

const getRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('allRecipes'));
    if(!recipes) return recipes;
    return []
}

const RECIPES = getRecipes();

const createAndRenderRecipesElem = () => {
    
}

const addRecipeHandler = () => {
    location.assign("/add-recipe.html")
}


addRecipeBtn.addEventListener("click", addRecipeHandler)