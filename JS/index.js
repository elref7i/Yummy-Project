'use strict';

const urls = {
  home: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
  categories: 'https://www.themealdb.com/api/json/v1/1/categories.php',
};

const row = $('<div class="row gx-0 gx-sm-3 gy-3 pt-4"></div>');
$('.home .container').append(row);

const allData = async (url) => {
  let data = null;
  // let typePage = type;
  try {
    const response = await fetch(url);
    if (data === null) {
      $('body').css({ backgroundColor: '#000' });
    } else {
      $('body').css({ backgroundColor: '#fff' });
    }
    data = await response.json();
    console.log(url === urls.categories);
    if (url === urls.home) {
      displayhome(data.meals);
      console.log(data.meals);
    } else if (url === urls.categories) {
      console.log(data.categories);
      displayCategories(data.categories);
    }
  } catch (error) {
    console.log('Error fatching data:', error);
  }
};

const details = async (id) => {
  let data = null;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (data === null) {
      $('body').css({ backgroundColor: '#000' });
    } else {
      $('body').css({ backgroundColor: '#fff' });
    }
    data = await response.json();
    console.log(data.meals[0]);
    displayDetailes(data.meals[0]);
  } catch (error) {
    console.log('Error fatching details:', error);
  }
};

allData(urls.home);

function displayhome(homeData) {
  $(row).html('');
  for (let i = 0; i < homeData.length; i++) {
    let meal = `
      <div class="| col-12 col-md-4 col-lg-3">
        <div class="inner p-3">
          <div class="image-foot home-image-meal cursor-p | rounded-4 overflow-hidden position-relative shadow-lg" data-home-id='${homeData[i].idMeal}' onclick='getIdDetails(${homeData[i].idMeal})'>
            <img src="${homeData[i].strMealThumb}" alt="" class="w-100">
            <div
              class="overlay-image position-absolute w-100 h-100 text-center p-2 d-flex justify-content-center align-items-center">
              <h2 class="fs-bold str-meal">${homeData[i].strMeal}</h2>
            </div>
          </div>
        </div>
      </div>
      `;
    $(row).append(meal);
  }
}

function getIdDetails(id) {
  console.log(id);
  details(id);
}
function displayDetailes(data) {
  $(row).html('');
  let showdetailes = `
  <div class="show-info  position-absolute end-0 start-0  top-0 pt-5 ">
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
  $('body').append(showdetailes);
  $('.close-detailes').on('click', function () {
    $('.show-info').hide(100);
    allData(urls.home);
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
//*------------------------------*//
function displayCategories(dataCategorie) {
  $(row).html('');
  for (let i = 0; i < dataCategorie.length; i++) {
    let categorie = `
    <div class="| col-12 col-md-4 col-lg-3">
      <div class="inner p-3">
        <div class="image-foot cursor-p | rounded-5 overflow-hidden position-relative shadow-lg ">
          <img src="${dataCategorie[i].strCategoryThumb}" alt="" class="w-100">
          <div class="overlay-image position-absolute w-100 h-100 text-center p-2">
            <h2 class="fs-bold">${dataCategorie[i].strCategory}</h2>
            <p>
              ${dataCategorie[i].strCategoryDescription}</p>
          </div>
        </div>
      </div>
    </div>`;
    $(row).append(categorie);
  }
}

$('.link-website').on('click', function () {
  if ($(this).attr('data-target') === 'categories') {
    allData(urls.categories);
  }
});

//*Sidebar-------------------------------*//
$('.icon-bar i').on('click', function (e) {
  if ($(this).attr('data-open') === 'true') {
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
