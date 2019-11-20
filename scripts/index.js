const addRecipeBtn = document.getElementById('add-recipe');
const recipeList = document.querySelector('.recipe-list');
const searchInput = document.querySelector('.search-input');

const getRecipes = () => {
	const recipes = JSON.parse(localStorage.getItem('allRecipes'));
	if (!recipes) return [];
	return recipes;
};

const RECIPES = getRecipes();

const createAndRenderRecipesElem = (RECIPES) => {
	if (RECIPES.length < 1) return recipeList.innerHTML = "<p> No recipe found. <p>" ;
	recipeList.innerHTML = ""
	for (const { title, ingredients, id } of RECIPES) {
		const ingredientStatus = ingredients.every(ing => ing.available);
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

createAndRenderRecipesElem(RECIPES);

const allRecipes = document.querySelectorAll('.recipe');

const addRecipeHandler = () => {
	location.assign('/add-recipe.html');
};

const editRecipeHandler = event => {
	const id = event.target.id;
	location.assign(`/add-recipe.html#${id}`);
};

const filterRecipeHandler = event => {
	const search = event.target.value;
	recipe = RECIPES.filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()));
	createAndRenderRecipesElem(recipe);
};

for (const recipe of allRecipes) {
	recipe.addEventListener('click', editRecipeHandler);
}

addRecipeBtn.addEventListener('click', addRecipeHandler);
searchInput.addEventListener('input', filterRecipeHandler);
