import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { CLOSE_MODAL_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    //0. update results view to mark active recipe.

    resultsView.update(model.searchResultsPage());
    bookmarkView.update(model.state.bookmark);
    //1.Load Recipe

    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // recipeView.renderError(`${err.message} something went wrong`);
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1. get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. load search result
    await model.loadSearchResult(query);

    //3. render result

    // resultsView.render(model.state.search.results);
    resultsView.render(model.searchResultsPage());

    //4. rander initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1. Render NEW page result
  resultsView.render(model.searchResultsPage(goToPage));

  //2. Change/render pagination  new button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the servings (in state)
  model.updateServings(newServings);
  // render new recipe vie
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  console.log(model.state.recipe.bookmarked);
  // 1. add and remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2. Update recipeview.
  recipeView.update(model.state.recipe);

  // 3. render bookmarks
  bookmarkView.render(model.state.bookmark);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner.
    recipeView.renderSpinner();

    //upload new recipe data.
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe.
    recipeView.render(model.state.recipe);

    //render message
    addRecipeView.renderMessage();

    // render bookmark
    bookmarkView.render(model.state.bookmark);

    //chane id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close modal window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_MODAL_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.adHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
