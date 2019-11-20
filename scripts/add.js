const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const ingredientList = document.querySelector('.ingredient-list');
const addIngredientButton = document.getElementById('btn-add');
const ingredientInput = document.getElementById('add-ingredient');
const addRecipeBtn = document.getElementById('add-recipe');

const getRecipes = () => {
	const recipes = JSON.parse(localStorage.getItem('allRecipes'));
	if (!recipes) return [];
	return recipes;
};

const RECIPES = getRecipes();

class Recipe {
	constructor(title, description, ingredients) {
		this.title = title;
		this.description = description;
		this.ingredients = ingredients;
		this.id = Math.random();
	}
}

const deleteIngredientHandler = event => {
	event.target.parentElement.remove();
};

const createIngredient = (ingName, checked = false) => {
	const li = document.createElement('li');
	li.className = 'ingredient-item';
	li.innerHTML = `
        <input type="checkbox"> 
        <span id="ing-name">${ingName}</span> <span class="ingredient-delete"> Remove </span>
	`;
	checked && li.querySelector('input').setAttribute('checked', checked);
	ingredientList.appendChild(li);
	li.querySelector('.ingredient-delete').addEventListener('click', deleteIngredientHandler);
};

const id = location.hash.slice(1);

if (id) {
	const recipe = RECIPES.find(recipe => +recipe.id === +id);
	const { title, description, ingredients } = recipe;
	titleInput.value = title;
	descriptionInput.value = description;
	for (const { name, available } of ingredients) {
		createIngredient(name, available);
	}
	addRecipeBtn.textContent = 'Edit Recipe';
}

const addIngredientHandler = () => {
	const ingName = ingredientInput.value;
	createIngredient(ingName);
	ingredientInput.value = '';
};

const addRecipeHandler = () => {
	const recipeName = titleInput.value;
	const descriptionName = descriptionInput.value;
	const ingredientsElem = Array.from(ingredientList.children);
	const ingredients = ingredientsElem.map(ing => ({
		name: ing.querySelector('span').textContent,
		available: ing.firstElementChild.checked,
	}));

	const recipes = JSON.parse(localStorage.getItem('allRecipes'));
	const recipe = new Recipe(recipeName, descriptionName, ingredients);
	if (recipes) {
		if (id) {
			const recipeIndex = recipes.findIndex(recipe => +recipe.id === +id);
			recipes[recipeIndex] = recipe;
		} else {
			recipes.push(recipe);
		}
		localStorage.setItem('allRecipes', JSON.stringify(recipes.reverse()));
	} else {
		localStorage.setItem('allRecipes', JSON.stringify([recipe]));
	}
	location.assign('/index.html');
};

addIngredientButton.addEventListener('click', addIngredientHandler);
addRecipeBtn.addEventListener('click', addRecipeHandler);
