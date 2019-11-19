const addRecipeBtn = document.getElementById('add-recipe');
const recipeList = document.querySelector('.recipe-list');

const getRecipes = () => {
	const recipes = JSON.parse(localStorage.getItem('allRecipes'));
	if (!recipes) return [];
	return recipes;
};

const RECIPES = getRecipes();

const createAndRenderRecipesElem = () => {
	if (RECIPES.length < 1) return;
	for (const { title, ingredients, id } of RECIPES) {
		const ingredientStatus = ingredients.every(ing => ing.available);
		console.log(name);
		const recipe = document.createElement('div');
		recipe.className = 'recipe';
		recipe.id = id;
		recipe.innerHTML = `
        <h3 class="recipe-title" id=${id} > ${title} </h3>
        <p class="recipe-status" id=${id}> ${
			ingredientStatus
				? 'You have all the ingredients to prepare this recipe'
				: 'You dont have all the ingredients to prepare this recipeF'
		} </p>        
        `;
		recipeList.append(recipe);
	}
};

createAndRenderRecipesElem();

const allRecipes = document.querySelectorAll(".recipe")

const addRecipeHandler = () => {
	location.assign('/add-recipe.html');
};

const editRecipeHandler = (event) => {
	const id = event.target.id;
	location.assign(`/add-recipe.html#${id}`);
}

for(const recipe of allRecipes) {
	recipe.addEventListener("click", editRecipeHandler)
}

addRecipeBtn.addEventListener('click', addRecipeHandler);