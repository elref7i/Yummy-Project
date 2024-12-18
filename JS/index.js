'use strict';

const urls = {
  home: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
  categories: 'https://www.themealdb.com/api/json/v1/1/categories.php',
  filterCatogry: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=beef',
  areas: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  filterAreas: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian',
  Ingredients: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  filteringredient:
    'https://www.themealdb.com/api/json/v1/1/filter.php?i=Salmon',
};

const row = $('<div class="row gx-0 gx-sm-3 gy-3 pt-4"></div>');
$('.home .container').append(row);
const pharagraphNotFouned = $(
  '<p class="text-danger fs-5 fond-bold">Not Founed Meal</p>'
);

let allDataHome;

function showLoading() {
  $('.loading-screen').show();
  $('html').css({ overflow: 'hidden' });
}
function hideLoading() {
  $('.loading-screen').hide();
  $('html').css({ overflow: 'auto' });
}
const allData = async (url) => {
  try {
    showLoading();
    const response = await fetch(url);
    const data = await response.json();
    //! console.log(url === urls.categories);
    if (url === urls.home) {
      // console.log(data.meals);
      displayhome('home', data.meals);
      // searchByName(data.meals);
      allDataHome = data.meals;
    } else if (url === urls.categories) {
      //! console.log(data.categories);
      displayhome('categories', data.categories);
    } else if (url === urls.filterCatogry) {
      //! console.log(data.meals);
      displayhome('filterCatogry', data.meals);
    } else if (url === urls.areas) {
      //! console.log(data.meals.length);
      displayhome('areas', data.meals);
    } else if (url === urls.filterAreas) {
      displayhome('filterAreas', data.meals);
    } else if (url === urls.Ingredients) {
      //! console.log(data.meals[0]);
      displayhome('Ingredients', data.meals);
    } else if (url === urls.filteringredient) {
      //!console.log(data.meals);
      if (data.meals !== null) {
        displayhome('filteringredient', data.meals);
      }
    }
  } catch (error) {
    console.log('Error fatching data:', error);
  } finally {
    hideLoading();
  }
};

const details = async (id) => {
  try {
    showLoading();
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    // !console.log(data.meals[0]);
    displayDetailes(data.meals[0]);
  } catch (error) {
    console.log('Error fatching details:', error);
  } finally {
    hideLoading();
  }
};
allData(urls.home);

//*Sidebar-------------------------------*//
$('.icon-bar i').on('click', function (e) {
  if ($(this).attr('data-open') === 'true') {
    console.log('a7a');
    $('aside').animate({ left: '0px' }, 400);
    $(this).hide(100, function () {
      $('.close-menue').css({ display: 'block' });
    });
  } else {
    $('aside').animate({ left: '-312.056px' });
    $(this).hide(100, function () {
      $('.open-menue').css({ display: 'block' });
    });
  }
});
//* Icon close in Details-------------------------- */
$('.link-website').on('click', function () {
  $('.detailes-screen').slideUp();
  $('.contact').hide();
  $('.form-search').hide();
  $('.contact').removeClass('d-flex');

  $('.home').show();
  if (
    $(this).attr('data-target').toLowerCase() === 'categories'.toLowerCase()
  ) {
    // hideSection();
    allData(urls.categories);
  } else if (
    $(this).attr('data-target').toLowerCase() === 'area'.toLowerCase()
  ) {
    // hideSection();
    allData(urls.areas);
  } else if (
    $(this).attr('data-target').toLowerCase() === 'ingradients'.toLowerCase()
  ) {
    // hideSection();
    allData(urls.Ingredients);
  } else if (
    $(this).attr('data-target').toLowerCase() === 'contact'.toLowerCase()
  ) {
    // $(row).html('');
    $('.contact').show();
    $('.contact').addClass('d-flex');
    $('.home').hide();
    $('.form-search').hide();
  } else if (
    $(this).attr('data-target').toLowerCase() === 'home'.toLowerCase()
  ) {
    $('.home').show();
    $('.form-search').show();
    allData(urls.home);
  }
});

//? let meal;

function loopdata(data) {
  for (let i = 0; i < data.length; i++) {
    let meal = `
    <div class="| col-12 col-md-4 col-lg-3">
      <div class="inner p-3">
        <div class="image-foot home-image-meal cursor-p | rounded-4 overflow-hidden position-relative shadow-lg" data-home-id='${data[i].idMeal}' onclick='getIdDetails(${data[i].idMeal})'>
          <img src="${data[i].strMealThumb}" alt="" class="w-100">
          <div
            class="overlay-image position-absolute w-100 h-100 text-center p-2 d-flex justify-content-center align-items-center">
            <h2 class="fs-bold str-meal">${data[i].strMeal}</h2>
          </div>
        </div>
      </div>
    </div>
    `;
    $(row).append(meal);
  }
}
// *** display Home -------- *//

function displayhome(type, data) {
  $(row).html('');
  if (
    type === 'home' ||
    type === 'filterAreas' ||
    type === 'filteringredient' ||
    type === 'filterCatogry'
  ) {
    if (data.length === 0) {
      $(row).html('');
      $(row).append(pharagraphNotFouned);
    } else {
      loopdata(data);
    }
  } else if (type === 'categories') {
    for (let i = 0; i < data.length; i++) {
      let categorie = `
          <div class="| col-12 col-md-4 col-lg-3" onclick='getNameFilter("${data[i].strCategory}")'>
            <div class="inner p-3">
              <div class="image-foot cursor-p | rounded-5 overflow-hidden position-relative shadow-lg ">
                <img src="${data[i].strCategoryThumb}" alt="" class="w-100">
                <div class="overlay-image position-absolute w-100 h-100 text-center p-2">
                  <h2 class="fs-bold">${data[i].strCategory}</h2>
                  <p>
                    ${data[i].strCategoryDescription}</p>
                </div>
              </div>
            </div>
          </div>`;
      $(row).append(categorie);
    }
  } else if (type === 'areas') {
    for (let i = 0; i < data.length; i++) {
      let areas = `
      <div class="| col-12 col-md-3 col-lg-2" onclick='getNameArea("${data[i].strArea}")'>
              <div class="inner p-3">
                <div class="image-foot cursor-p | rounded-5 overflow-hidden position-relative shadow-lg ">
                  <img
                    src="imgs/chef cook sticker logo clipart.png"
                    alt="" class="w-100">
                  <div class="overlay-image bg-white text-black w-100 h-100 text-center p-2">
                    <h2 class="fs-bold">${data[i].strArea}</h2>
                  </div>
                </div>
              </div>
            </div>`;
      $(row).append(areas);
    }
  } else if (type === 'Ingredients') {
    for (let i = 0; i < 23; i++) {
      let IngredientCol = `
        <div class="| col-12 col-md-4 col-lg-3" onclick='getNameFilterIngredients("${
          data[i].strIngredient
        }")' >
              <div class=" inner p-3 ">
                <div class="image-foot cursor-p | rounded-5 overflow-hidden position-relative shadow-lg ">
                  <img src="imgs/spaghetti-with-vegetables-cooking-in-a-pan-png.webp" alt="" class="image-Ingredient ">
                  <div class="text-black bg-white w-100 h-100 text-center p-2">
                    <h2 class="fs-bold text-nowrap fs-4 mb-2">${
                      data[i].strIngredient
                    }</h2>
                    <p class='text-muted'>${letterLimit(
                      data[i].strDescription
                    )}</p>
                  </div>
                </div>
              </div>
            </div>`;
      $(row).append(IngredientCol);
    }
  }
}
// *** display Categotries -------- *//

function letterLimit(pharagraph) {
  let stringSplit = pharagraph.split(' ');
  let limit = [];
  for (let i = 0; i < 25; i++) {
    limit.push(stringSplit[i]);
  }

  return limit.join(' ');
}

//* display Detailes------*//
function displayDetailes(data) {
  $('.detailes-screen').html('');
  let showdetailes = `
  <div class="show-info ">
  <div class="container d-flex justify-content-center align-items-center">
  <div class="row gx-0 gx-sm-3 gy-3 text-white  ">
  <div class="left-info col-12 col-md-3 col-lg-4">
  <div class="overflow-hidden rounded-3 mb-2 ">
  <img src="${data.strMealThumb}" class="w-100" alt="">
  </div>
  <h3>${data.strMeal}</h3>
  </div>
  <div class="right-info col-12 col-md-9 col-lg-8">
  <h4>instructions</h4>
  <p>${data.strInstructions}</p>
  <h3>Area<span class="px-2">:</span>${data.strArea}</h3>
  <h3>Category<span class="px-2">:</span>${data.strCategory}</h3>
  <h3>Recipes <span class="ps-2">:</span></h3>
  <ul class="recips-list list-unstyled d-flex gap-3 flex-wrap">
  </ul>
  <h3>Tags<span class="ps-2">:</span></h3>
  <ul class="tags-list list-unstyled d-flex flex-wrap gap-3">
  </ul>
  <div class="link-source py-2">
  <a href="${data.strSource}" target='_blank' class="btn btn-success">Source</a>
  <a href="${data.strYoutube}" target='_blank' class="btn btn-danger">Youtube</a>
  </div>
  </div>
  </div>
  </div>
  <i
  class="close-detailes | fa-solid fa-x text-white  fs-3 position-absolute top-0 end-0 m-4 translate-middle- cursor-p"></i>
  </div>
  `;
  let topWindow = $(window).scrollTop();
  $('.detailes-screen').css({ top: `${topWindow}px` });
  $('.detailes-screen').append(showdetailes);
  $('.detailes-screen').slideDown(function () {
    $('html').css({ overflow: 'hidden' });
  });
  $('.close-detailes').on('click', function () {
    $('.detailes-screen').slideUp(function () {
      $('html').css({ overflow: 'auto' });
    });
  });
  for (let i = 1; i <= 20; i++) {
    let measure = `strMeasure${i}`;
    let Ingradient = `strIngredient${i}`;
    if (data[measure] !== '' && data[Ingradient] !== '') {
      let recips = $(
        `<li class="bg-danger p-3 rounded-4 w-fit">${data[measure]}${data[Ingradient]}</li>`
      );
      $('.recips-list').append(recips);
    }
  }
  if (data.strTags !== null) {
    let AllTags = data.strTags.split(',');
    for (let i = 0; i < AllTags.length; i++) {
      let tag = $(
        `<li class="bg-white p-2 text-black rounded-3 w-fit">${AllTags[i]}</li>`
      );
      $('.tags-list').append(tag);
    }
  }
}

//* get id categories ------*//
function getIdDetails(id) {
  details(id);
}
function getNameArea(nameArea) {
  console.log(nameArea);
  urls.filterAreas = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nameArea}`;
  allData(urls.filterAreas);
}
//* function type on click get name gategories------------------*//
function getNameFilter(nameFilter) {
  console.log(nameFilter);
  urls.filterCatogry = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameFilter}`;
  allData(urls.filterCatogry);
}
function getNameFilterIngredients(nameFilter) {
  console.log(nameFilter);
  urls.filteringredient = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameFilter}`;
  allData(urls.filteringredient);
}

// ~ *** RealTime Search */

// * Search By name Meal
$('.by-name').on('input', function () {
  const searchValue = $(this).val().toLowerCase();
  let filterNameMeals = allDataHome.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchValue)
  );

  displayhome('home', filterNameMeals);
});
$('.by-first-litter').on('input', function () {
  let currentValue = $(this).val();

  if (currentValue.length > 1) {
    $(this).val(currentValue.slice(0, 1));
  }
  let filterFirstCharMeal = allDataHome.filter((f) =>
    f.strMeal.slice(0, 1).toLowerCase().includes(currentValue)
  );
  displayhome('home', filterFirstCharMeal);
});

// * Search By First Character from name Meal
