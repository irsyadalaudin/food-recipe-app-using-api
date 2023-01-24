const searchBtn = document.getElementById('search-btn');                                // DI HTML id    KOLOM 23-24
const mealList = document.getElementById('meal');                                       // DI HTML id    KOLOM 33
const mealDetailsContent = document.getElementsByClassName('meal-details-content');     // DI HTML class KOLOM 77
const recipeCloseBtn = document.getElementById('recipe-close-btn');                     // DI HTML id    KOLOM 72


/* EVENT LISTENERS */
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe)


/* GET MEAL LIST THAT MATCHES WITH THE INGREDIENTS */
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);   // UNTUK MEMUNCULKAN ${searchInputTxt}
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id ="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
                `;
            })
        } else {
            html = "Sorry, we didn't find any meal!"
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
}


/* GET RECIPE OF THE MEAL */
function getMealRecipe(e) {                                     // e (event) ITU VARIABLE, VARIABLE ITU ARGUMEN,  ARGUMEN DISINI BERUPA OBJECT.   // e ITU OBJECT, DIDALAMNYA ADA METHOD, METHOD ITU FUNCTION YANG ADA DI DALAM OBJECT, METHOD NYA preventDefault()
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {            // "recipe-btn" DI K0LOM 27
        let mealItem = e.target.parentElement.parentElement;    // e.target UNTUK MENGAKSES VALUE target    // form ITU ADA input nya, DAN input nya DAPAT DIAKSES DENGAN e.event.target
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
        /*
        .then(data => {
            console.log(data);                                  // UNTUK MEMUNCULKAN (e.target.classList.contains('recipe-btn')) DI KOLOM 45
            })                                                  // INI STEP SEBELUM YANG ADA DI KOLOM 50
        */
    }
}

/* CREATE A MODAL */
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">Meals Name Here</h2>
    <p class="recipe-category">Category</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error necessitatibus suscipit iusto incidunt architecto dolore obcaecati deleniti fuga, aliquid distinctio asperiores dignissimos dolorum harum iure a, qui accusamus! Ratione, at!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, cupiditate!</p>
    </div>
    <div class="recipe-meal-img">
        <img src="food.jpg" alt="">
    </div>
    <div class="recipe-link">
        <a href="#" target="_blank">Watch Video</a>
    </div>
    `;
}