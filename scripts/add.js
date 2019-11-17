const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const ingredientList = document.querySelector('.ingredient-list');
const addIngredientButton = document.getElementById('btn-add');
const ingredientInput = document.getElementById('add-ingredient');
const addRecipeBtn = document.getElementById('add-recipe');

const createIngredient = ingName => {
	const li = document.createElement('li');
	li.className = 'ingredient-item';
	li.innerHTML = `
        <input type="checkbox"> 
        <span id="ing-name">${ingName}</span> <span class="ingredient-delete"> Remove </span>
    `;
	ingredientList.appendChild(li);
};

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
	if (recipes) {
		recipes.unshift({
			name: recipeName,
			description: descriptionName,
			ingredients,
		});
		localStorage.setItem('allRecipes', JSON.stringify(recipes));
	} else {
		localStorage.setItem(
			'allRecipes',
			JSON.stringify([
				{
					name: recipeName,
					description: descriptionName,
					ingredients,
				},
			])
		);
	}
	location.assign('/index.html');
};

addIngredientButton.addEventListener('click', addIngredientHandler);
addRecipeBtn.addEventListener('click', addRecipeHandler);
