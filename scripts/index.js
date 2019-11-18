const addRecipeBtn = document.getElementById('add-recipe');
const recipeList = document.querySelector('.recipe-list');

const getRecipes = () => {
	const recipes = JSON.parse(localStorage.getItem('allRecipes'));
	if (!recipes) return [];
	return recipes;
};

const RECIPES = getRecipes();

console.log(RECIPES);

const createAndRenderRecipesElem = () => {
	if (RECIPES.length < 1) return;
	for (const { title, ingredients } of RECIPES) {
		const ingredientStatus = ingredients.every(ing => ing.available);
		console.log(name);
		const recipe = document.createElement('div');
		recipe.className = 'recipe';
		recipe.innerHTML = `
        <h3 class="recipe-title"> ${title} </h3>
        <p class="recipe-status"> ${
			ingredientStatus
				? 'You have all the ingredients to prepare this recipe'
				: 'You dont have all the ingredients to prepare this recipeF'
		} </p>        
        `;
		recipeList.append(recipe);
	}
};

createAndRenderRecipesElem();

const addRecipeHandler = () => {
	location.assign('/add-recipe.html');
};

addRecipeBtn.addEventListener('click', addRecipeHandler);