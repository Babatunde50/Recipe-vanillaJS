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
	constructor(title, description, ingredients ) {
		this.title = title;
		this.description = description;
		this.ingredients = ingredients
		this.id = Math.random()
	}
}


const createIngredient = (ingName, checked=false) => {
	const li = document.createElement('li');
	li.className = 'ingredient-item';
	li.innerHTML = `
        <input type="checkbox" checked=${checked} > 
        <span id="ing-name">${ingName}</span> <span class="ingredient-delete"> Remove </span>
    `;
	ingredientList.appendChild(li);
};

const id = location.hash.slice(1)


if(id) {
	const recipe = RECIPES.find(recipe => +recipe.id === +id)
	const { title, description, ingredients } = recipe;
	titleInput.value = title;
	descriptionInput.value = description;
	for(const { name, available } of ingredients) {
		createIngredient(name, available)
	}
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
		recipes.unshift(recipe);
		localStorage.setItem('allRecipes', JSON.stringify(recipes));
	} else {
		console.log(recipe)
		localStorage.setItem(
			'allRecipes',
			JSON.stringify([
				recipe
			])
		);
	}
	location.assign('/index.html');
};

addIngredientButton.addEventListener('click', addIngredientHandler);
addRecipeBtn.addEventListener('click', addRecipeHandler);
