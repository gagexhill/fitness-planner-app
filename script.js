let globalRecipes = [];

document.getElementById('search-button').addEventListener('click', performSearch);

document.getElementById('recipe-search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = document.getElementById('recipe-search-input').value;
    fetchRecipes(query);
}

function fetchRecipes(query) {
    const apiURL = getApiUrl(query);

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            globalRecipes = data.results;
            displayRecipes(globalRecipes);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            alert('Failed to fetch recipes. Please try again.');
        });
}

function getApiUrl(query) {
    const apiKey = 'a2c8b4ccf2514ddca86c1e9b2dc19413';
    return `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&apiKey=${apiKey}`;
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-cards');
    container.innerHTML = '';
    const totalRecipes = recipes.length;

    recipes.forEach((recipe, index) => {
        const isActive = index === 0 ? 'active' : '';
        const cardHTML = `
            <div class="carousel-item ${isActive}" data-recipe-index="${index + 1}">
                <div class="card">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#recipeModal" onclick="showRecipeDetails(${recipe.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });

    updateRecipeCount(1, totalRecipes);
}

function updateRecipeCount(currentIndex, total) {
    const countDisplay = document.getElementById('recipe-count');
    countDisplay.textContent = `${currentIndex} of ${total}`;
}

$('#recipe-carousel').on('slid.bs.carousel', function (event) {
    const currentIndex = event.relatedTarget.getAttribute('data-recipe-index');
    updateRecipeCount(currentIndex, globalRecipes.length);
});

function showRecipeDetails(recipeId) {
    const apiURL = getApiUrlForRecipeDetails(recipeId);

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            populateModal(data);
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            alert('Failed to fetch recipe details. Please try again.');
        });
}

function getApiUrlForRecipeDetails(recipeId) {
    const apiKey = 'a2c8b4ccf2514ddca86c1e9b2dc19413';
    return `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
}

function populateModal(recipe) {
    const modalTitle = document.getElementById('recipeModalLabel');
    const modalBody = document.querySelector('#recipeModal .modal-body');

    modalTitle.textContent = recipe.title;

    modalBody.innerHTML = `
        <img src="${recipe.image}" class="img-fluid" alt="${recipe.title}">
        <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <h5>Ingredients:</h5>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h5>Instructions:</h5>
        <p>${recipe.instructions ? recipe.instructions : 'No instructions provided.'}</p>
    `;
}
