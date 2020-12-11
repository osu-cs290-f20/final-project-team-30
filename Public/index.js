/*
 * Write your JS code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Jawad Alamgir
 * Email: alamgirj@oregonstate.edu
 */

/*
 * You must update this function to use your Handlebars post template to
 * generate HTML representing a single post, given the description, photo URL,
 * price, city, and condition of the item to be sold as arguments to the
 * function.  The generated HTML should then be inserted into the DOM at the
 * end of the <section> element whose id is "posts".
 *
 * The function currently uses native JS methods to generate a new DOM element
 * representing single post, given the specified information, and inserts that
 * post into the DOM.  The new post element has the following structure:
 *
 * <div class="post" data-price="<PRICE>" data-city="<CITY>" data-condition="<CONDITION>">
 *   <div class="post-contents">
 *     <div class="post-image-container">
 *       <img src="<PHOTO_URL>" alt="<ITEM_DESCRIPTION>">
 *     </div>
 *     <div class="post-info-container">
 *       <a href="#" class="post-title"><ITEM_DESCRIPTION></a> <span class="post-price">$<PRICE></span> <span class="post-city">(<CITY>)</span>
 *     </div>
 *   </div>
 * </div>
 */
function insertNewPost(description, photoURL, price, city, condition) {
  var context = {
    postTitle: description,
    postPrice: price,
    url: photoURL,
    postCondition: condition,
    postCity: city
  };
  console.log(" == undefined is: ", Handlebars.templates);
  var postTemplateHTML = Handlebars.templates.pageTemplate(context);
  var postsSection = document.getElementById('posts');
  console.log("  ==  HTML Template: ", postTemplateHTML);
  //postsSection.appendChild(postDiv);
  postsSection.insertAdjacentHTML('beforeend' ,postTemplateHTML);

  // // // Create the containing <div> element.
  // var postDiv = document.createElement('div');
  // postDiv.classList.add('post');
  // postDiv.setAttribute('data-price', price);
  // postDiv.setAttribute('data-city', city);
  // postDiv.setAttribute('data-condition', condition);
  //
  // // // Create the inner post-contents <div> and add it to the post <div>.
  // var postContentsDiv = document.createElement('div');
  // postContentsDiv.classList.add('post-contents');
  // postDiv.appendChild(postContentsDiv);
  //
  // // /*
  // //  * Create the post-image-container <div> and its <img> contents and add
  // //  * them into the post-contents <div>.
  // //  */
  // var postImageContainerDiv = document.createElement('div');
  // postImageContainerDiv.classList.add('post-image-container');
  // postContentsDiv.appendChild(postImageContainerDiv);
  //
  // var postImg = document.createElement('img');
  // postImg.src = photoURL;
  // postImg.alt = description;
  // postImageContainerDiv.appendChild(postImg);
  //
  // // /*
  // //  * Create the post-info-container <div> and all of its contents and add
  // //  * them into the post-contents <div>.
  // //  */
  // var postInfoContainerDiv = document.createElement('div');
  // postInfoContainerDiv.classList.add('post-info-container');
  // postContentsDiv.appendChild(postInfoContainerDiv);
  //
  // var postLink = document.createElement('a');
  // postLink.classList.add('post-title');
  // postLink.href = '#';
  // postLink.textContent = description;
  // postInfoContainerDiv.appendChild(postLink);
  //
  // var spaceText1 = document.createTextNode(' ');
  // postInfoContainerDiv.appendChild(spaceText1);
  //
  // var postPriceSpan = document.createElement('span');
  // postPriceSpan.classList.add('post-price');
  // postPriceSpan.textContent = '$' + price;
  // postInfoContainerDiv.appendChild(postPriceSpan);
  //
  // var spaceText2 = document.createTextNode(' ');
  // postInfoContainerDiv.appendChild(spaceText2);
  //
  // var postCitySpan = document.createElement('span');
  // postCitySpan.classList.add('post-city');
  // postCitySpan.textContent = '(' + city + ')';
  // postInfoContainerDiv.appendChild(postCitySpan);
  //
  // /*
  //  * Add the new post element into the DOM at the end of the posts <section>.
  //  */
  //  //var postTemplateHTML = Handlebars.templates.postTemplate(context);
  //  var postsSection = document.getElementById('posts');
  //  postsSection.appendChild(postDiv);

}


/***************************************************************************
 **
 ** You should not modify any of the functions below.
 **
 ***************************************************************************/

/*
 * These arrays hold the collection of all post objects and the list of all
 * cities that have been used in posts.
 */
var allPosts = [];
var allCities = [];

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so,i nserting a new post into the page constructed using
 * these inputs.  If the user did not supply a required input, they instead
 * recieve an alert, and no new post is inserted.
 */
function handleModalAcceptClick() {

  var name = document.getElementById('post-name-input').value.trim();
  var photoURL = document.getElementById('post-photo-input').value.trim();
  var length = document.getElementById('post-length-input').value.trim();
  var type = document.getElementById('post-type-input').value.trim();
  var difficulty = document.querySelector('#post-difficulty-fieldset input:checked').value;

  if (!name || !photoURL || !length || !type || !difficulty) {
    alert("You must fill in all of the fields!");
  } else {

    allPosts.push({
      description: name,
      photoURL: photoURL,
      price: length,
      city: type,
      condition: difficulty
    });

    clearFiltersAndReinsertPosts();

    addCityToAllCities(city);

    hideSellSomethingModal();

  }

}


/*
 * This function clears all filter values, causing all posts to be re-inserted
 * into the DOM.
 */
function clearFiltersAndReinsertPosts() {

  document.getElementById('filter-name').value = "";
  document.getElementById('filter-min-length').value = "";
  document.getElementById('filter-max-length').value = "";
  document.getElementById('filter-type').value = "";

  var filterConditionCheckedInputs = document.querySelectorAll("#filter-difficulty input");
  for (var i = 0; i < filterConditionCheckedInputs.length; i++) {
    filterConditionCheckedInputs[i].checked = false;
  }

  doFilterUpdate();

}


/*
 * This function checks to see if a city is included in the collection of all
 * cities for which we have a post.  If it's not, the new city is added to the
 * collection.
 */
function addCityToAllCities(city) {

  /*
   * If city doesn't already exist in the list of cities by which we can
   * filter, add it.
   */
  if (allCities.indexOf(city.toLowerCase()) === -1) {
    allCities.push(city.toLowerCase());
    var newCityOption = createCityOption(city);
    var filterCitySelect = document.getElementById('filter-type');
    filterCitySelect.appendChild(newCityOption);
  }

}


/*
 * This function shows the "sell something" modal by removing the "hidden"
 * class from the modal and backdrop.
 */
function showSellSomethingModal() {

  var showSomethingModal = document.getElementById('add-hike-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}


/*
 * This function clears any user-entered inputs in the "sell something" modal.
 */
function clearSellSomethingModalInputs() {

  var postTextInputElements = [
    document.getElementById('post-name-input'),
    document.getElementById('post-photo-input'),
    document.getElementById('post-length-input'),
    document.getElementById('post-type-input')
  ];

  /*
   * Clear any text entered in the text inputs.
   */
  postTextInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });

  /*
   * Grab the originally checked radio button and make sure it's checked.
   */
  var checkedPostConditionButton = document.querySelector('#post-difficulty-fieldset input[checked]');
  checkedPostConditionButton.checked = true;

}


/*
 * This function hides the "sell something" modal by adding the "hidden"
 * class from the modal and backdrop.  It also clears any existing inputs in
 * the modal's input fields when the modal is hidden.
 */
function hideSellSomethingModal() {

  var showSomethingModal = document.getElementById('add-hike-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearSellSomethingModalInputs();

}


/*
 * This function creates a new <option> element containing a given city name.
 */
function createCityOption(city) {
  var newCityOption = document.createElement('option');
  newCityOption.textContent = city;
  return newCityOption;
}


/*
 * A function to apply the current filters to a specific post.  Returns true
 * if the post passes the filters and should be displayed and false otherwise.
 */
function postPassesFilters(post, filters) {

  if (filters.text) {
    var postDescription = post.description.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if (postDescription.indexOf(filterText) === -1) {
      return false;
    }
  }

  if (filters.minPrice) {
    var filterMinPrice = Number(filters.minPrice);
    if (Number(post.price) < filterMinPrice) {
      return false;
    }
  }

  if (filters.maxPrice) {
    var filterMaxPrice = Number(filters.maxPrice);
    if (Number(post.price) > filterMaxPrice) {
      return false;
    }
  }

  if (filters.city) {
    if (post.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
  }

  if (filters.conditions && filters.conditions.length > 0) {
    if (filters.conditions.indexOf(post.condition) === -1) {
      return false;
    }
  }

  return true;

}


/*
 * Applies the filters currently entered by the user to the set of all posts.
 * Any post that satisfies the user's filter values will be displayed,
 * including posts that are not currently being displayed because they didn't
 * satisfy an old set of filters.  Posts that don't satisfy the filters are
 * removed from the DOM.
 */
function doFilterUpdate() {

  /*
   * Grab values of filters from user inputs.
   */
  var filters = {
    text: document.getElementById('filter-name').value.trim(),
    minPrice: document.getElementById('filter-min-length').value,
    maxPrice: document.getElementById('filter-max-length').value,
    city: document.getElementById('filter-type').value.trim(),
    conditions: []
  }

  var filterConditionCheckedInputs = document.querySelectorAll("#filter-difficulty input:checked");
  for (var i = 0; i < filterConditionCheckedInputs.length; i++) {
    filters.conditions.push(filterConditionCheckedInputs[i].value);
  }

  /*
   * Remove all "post" elements from the DOM.
   */
  var postContainer = document.getElementById('posts');
  while(postContainer.lastChild) {
    postContainer.removeChild(postContainer.lastChild);
  }

  /*
   * Loop through the collection of all "post" elements and re-insert ones
   * that meet the current filtering criteria.
   */
  allPosts.forEach(function (post) {
    if (postPassesFilters(post, filters)) {
      insertNewPost(post.description, post.photoURL, post.price, post.city, post.condition);
    }
  });

}


/*
 * This function parses an existing DOM element representing a single post
 * into an object representing that post and returns that object.  The object
 * is structured like this:
 *
 * {
 *   description: "...",
 *   photoURL: "...",
 *   price: ...,
 *   city: "...",
 *   condition: "..."
 * }
 */
function parsePostElem(postElem) {

  var post = {
    price: postElem.getAttribute('data-length'),
    city: postElem.getAttribute('data-type'),
    condition: postElem.getAttribute('data-difficulty')
  };

  var postImageElem = postElem.querySelector('.post-image-container img');
  post.photoURL = postImageElem.src;
  post.description = postImageElem.alt;

  return post;

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  /*
   * Remember all of the initial post elements initially displayed in the page.
   */
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
    allPosts.push(parsePostElem(postElems[i]));
  }

  /*
   * Grab all of the city names already in the filter dropdown.
   */
  var filterCitySelect = document.getElementById('filter-type');
  if (filterCitySelect) {
    var filterCityOptions = filterCitySelect.querySelectorAll('option:not([selected])');
    for (var i = 0; i < filterCityOptions.length; i++) {
      allCities.push(filterCityOptions[i].value.trim().toLowerCase());
    }
  }

  var sellSomethingButton = document.getElementById('add-hike-button');
  if (sellSomethingButton) {
    sellSomethingButton.addEventListener('click', showSellSomethingModal);
  }

  var modalAcceptButton = document.getElementById('modal-accept');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideSellSomethingModal);
  }

  var filterUpdateButton = document.getElementById('filter-update-button');
  if (filterUpdateButton) {
    filterUpdateButton.addEventListener('click', doFilterUpdate)
  }

});
