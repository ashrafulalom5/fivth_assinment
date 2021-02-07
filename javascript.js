// foodlist function

const getFoodList = () => {
    let searchInputTxt = document.getElementById("search-input").value;
    let key;
    if(searchInputTxt.length == 1){
        key = "f";
    }
    else{
        key = "s";
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${key}=${searchInputTxt}`)
        .then((response) => response.json())
        .then((data) => {
            displayFood(data.meals);
        });
};
// display food function
const displayFood = (foods) => {
    let foodContainer = document.getElementById("food-container");
    // let foods = data.meals;
    if (foods === null || foods.length < 0) {
        const foodItem = document.createElement("div");
        const foodDetails = `
            <h2> "invalid food item, please try another food. <br> thank you"</h2>
        `;
        foodItem.innerHTML = foodDetails;
        foodContainer.appendChild(foodItem);
    } else {
        foods.forEach((food) => {
            // console.log(food);
            const foodItem = document.createElement("div");
            foodItem.className = "col-md-4 my-3";
            const foodDetails = `
                    <div onclick="displayCountryDetail('${food.idMeal}')" class="card" style="width: 18rem;">
                        <img  class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text"><h4>${food.strMeal}</h4></p>
                        </div>
                    </div>
                `;
                foodItem.innerHTML = foodDetails;
            foodContainer.appendChild(foodItem);
        });
    }
    document.getElementById("search-input").value = "";
}
// food details function
const displayCountryDetail = foodDetails => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetails}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getFoodInfo(data.meals[0]);
        });
}

const getFoodInfo = food => {
    const foodDetail = document.getElementById('food-details');
    const cockingIngredients = [];
    for (let i = 1; i <= 20; i++) {
        if (food[`strIngredient${i}`]) {
            cockingIngredients.push(`${food[`strMeasure${i}`]}-${food[`strIngredient${i}`]}`);
        } else {
            break;
        }
    }
    foodDetail.innerHTML = `
          <div class="card card-custom">
              <img class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
              <div class="card-body">
                  <p class="card-text"><h4>${food.strMeal}</h4></p>
                  <h5>Cocking Ingredients:</h5>
                  <ul>
                      ${cockingIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
              </div>
          </div>
           `;
}
