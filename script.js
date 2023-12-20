document.getElementById('search-button').addEventListener('click', function() {
    performSearch();
});

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
    const apiURL = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&apiKey=a2c8b4ccf2514ddca86c1e9b2dc19413`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.results);
        })
        .catch(error => console.error('Error fetching recipes:', error));
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
    countDisplay.textContent = `Viewing recipe ${currentIndex} of ${total}`;
}

$('#recipe-carousel').on('slid.bs.carousel', function (event) {
    const currentIndex = event.relatedTarget.getAttribute('data-recipe-index');
    updateRecipeCount(currentIndex, recipes.length);
});

function showRecipeDetails(recipeId) {
    const apiURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a2c8b4ccf2514ddca86c1e9b2dc19413`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            populateModal(data);
        })
        .catch(error => console.error('Error fetching recipe details:', error));
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

const wellnessEntries = [
    { title: 'Be like Mike', image: 'https://miro.medium.com/v2/resize:fit:1200/1*yfsUzfsIv3JDcvXaFpexeA@2x.jpeg', text: 'The be like mike workout actually helped me be more like mike! Awesome material' },
    { title: 'Got milk', image: 'https://static.tvtropes.org/pmwiki/pub/images/got_milk_3.png', text: 'The got milk program has helped me alot. I prefer soymilk' },
    // Add more entries here as needed
];

const wellnessCarousel = document.getElementById('wellness-entries');
wellnessEntries.forEach((entry, index) => {
    const isActive = index === 0 ? 'active' : '';
    const entryHTML = `
        <div class="carousel-item ${isActive}" data-wellness-index="${index + 1}">
            <div class="card" data-toggle="modal" data-target="#wellnessModal">
                <img src="${entry.image}" class="card-img-top" alt="${entry.title}">
                <div class="card-body">
                    <h5 class="card-title">${entry.title}</h5>
                    <p class="card-text">${entry.text}</p>
                </div>
            </div>
        </div>
    `;
    wellnessCarousel.innerHTML += entryHTML;
});

// shows entries
$('#wellness-carousel').on('click', '.card', function () {
    const title = $(this).find('.card-title').text();
    const imageSrc = $(this).find('.card-img-top').attr('src');
    const text = $(this).find('.card-text').text();

    $('#wellnessModalLabel').text(title);
    $('#wellnessModal .modal-body img').attr('src', imageSrc);
    $('#wellnessModal .modal-body h5').text(title);
    $('#wellnessModal .modal-body p').text(text);

    $('#wellnessModal').modal('show');
});