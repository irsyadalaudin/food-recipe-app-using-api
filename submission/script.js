const searchBtn = document.getElementById('search-btn');                                // DI HTML id    KOLOM 23-24
const mealList = document.getElementById('meal');                                       // DI HTML id    KOLOM 
const mealDetailsContent = document.getElementsByClassName('meal-details-content');     // DI HTML class KOLOM 77
const recipeCloseBtn = document.getElementById('recipe-close-btn');                     // DI HTML id    KOLOM 72


/* EVENT LISTENER */
searchBtn.addEventListener('click', getMealList);

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