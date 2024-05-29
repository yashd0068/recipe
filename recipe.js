document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeIngredientsInput = document.getElementById('recipe-ingredients');
    const recipeImageInput = document.getElementById('recipe-image');
    const recipeIdInput = document.getElementById('recipe-id');
    const recipesList = document.getElementById('recipes-list');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    function displayRecipes() {
        recipesList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.ingredients}</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            `;

            recipesList.appendChild(recipeCard);
        });
    }

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = recipeNameInput.value;
        const ingredients = recipeIngredientsInput.value;
        const image = recipeImageInput.value;
        const id = recipeIdInput.value;

        if (id) {
            recipes[id] = { name, ingredients, image };
        } else {
            recipes.push({ name, ingredients, image });
        }

        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        recipeForm.reset();
        recipeIdInput.value = '';
    });

    window.editRecipe = (index) => {
        const recipe = recipes[index];
        recipeNameInput.value = recipe.name;
        recipeIngredientsInput.value = recipe.ingredients;
        recipeImageInput.value = recipe.image;
        recipeIdInput.value = index;
    };

    window.deleteRecipe = (index) => {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    };

    displayRecipes();
});
