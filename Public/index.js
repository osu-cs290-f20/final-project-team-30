/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Jawad Alamgir
 * Email: alamgirj@oregonstate.edu
 */

//Variables to get elements
var SellButton = document.getElementById("add-hike-button");
var SellModal = document.getElementById("add-hike-modal");
var SellModalBackdrop = document.getElementById("modal-backdrop");
var ModalCloseButton = document.getElementById("modal-close");
//var ModalDialogue = document.getElementsByClassName("modal-dialog");
var Input = document.getElementsByTagName("input");
var ModalCancelButton = document.getElementById("modal-cancel");
var ModalAcceptButton = document.getElementById("modal-accept");
var ModalTextBox = document.getElementById("post-name-input");
var PostContainer = document.getElementById("posts");
var PostFieldset = document.getElementById("post-difficulty-fieldset");
var FilterText = document.getElementById('filter-name');
var FilterMinPrice = document.getElementById('filter-min-length');
var FilterMaxPrice = document.getElementById('filter-max-length');
var FilterCity = document.getElementById('filter-type');
var FilterUpdateButton = document.getElementById('filter-update-button');
var ConditionFieldset = document.getElementById('filter-difficulty');
var PostTitle = document.querySelectorAll('.post-title');
console.log("  == Post Title: ", PostTitle);

function postTitleActionFunc(event){
  //var num  = i;
  var temp = event.target.textContent;
  console.log(" == value of temp: ", temp);
  console.log(" == function responsding on click == ");
  window.location = 'https://localhost:3000/posts/:' + temp +'/';
}

//Listeners
for(i =0; i< PostTitle.length; i++){
  PostTitle[i].addEventListener('click', postTitleActionFunc);
}

SellButton.addEventListener('click', SellButtonFunc);
ModalCloseButton.addEventListener('click', SellButtonFunc);
ModalCancelButton.addEventListener('click', SellButtonFunc);
ModalAcceptButton.addEventListener('click', CreatePost);
FilterUpdateButton.addEventListener('click', FilterPosts)

var ConditionValue;
ConditionFieldset.addEventListener('click', function(event){
  // console.log(" -- Fieldset click:", event.target);
  // console.log(" -- Attribute ID:", event.target.value);
  // event.stopPropagation();
  ConditionValue = event.target.value;
})

//function executes all functionality for post filtering fulfilling second part of the assignment
function FilterPosts(event){
  var TextUserInput = FilterText.value;
  TextUserInput = TextUserInput.toLowerCase();
  var MinInput = FilterMinPrice.value;
  var MaxInput = FilterMaxPrice.value;
  var FilterCondition = [];
  //console.log(" -- Condition Fieldset:", ConditionFieldset.children[1].children[0].checked);
  for(i=0; i< 5; i++){
    if(ConditionFieldset.children[1+i].children[0].checked){
        FilterCondition.push(ConditionFieldset.children[1+i].children[0].getAttribute('value'));
    }
  }
  //console.log(" -- Filter Condition:", FilterCondition);
  //console.log(" -- City Selected options:", FilterCity.selectedOptions[0]);
  for(i = 0; i < 7; i++){
    var CityInput = FilterCity.selectedOptions[i];  //selectedOptions Doesn't work on internet explorer apparently
    if(CityInput){
      break;
    }
  }
  //console.log(" -- City Input:" , CityInput);
  //console.log(" -- Child Attribute:", PostContainer.children[0].getAttribute("data-price"));
  //console.log(" -- Post Container Length:", PostContainer.childElementCount);
  for(i = 0; i < PostContainer.childElementCount;i++){
    var Price = PostContainer.children[i].getAttribute("data-length");
    Price = parseInt(Price, 10);
    var PostText = PostContainer.children[i].children[0].children[1].children[0].textContent;
    PostText = PostText.toLowerCase();
    var PostCity = PostContainer.children[i].getAttribute("data-type");
    var PostCondition = PostContainer.children[i].getAttribute("data-difficulty");

    if(TextUserInput != ""){
      if(PostText.includes(TextUserInput) == false){
        //console.log(" -- User Text Input: ", TextUserInput);
        //console.log(" -- Text Input Reached --");
        PostContainer.children[i].classList.add("hidden");
      }
    }

    if(MinInput != ""){
      if(Price < MinInput){
        //console.log(" -- Min Input Reached --");
        PostContainer.children[i].classList.add("hidden");
      }
    }

    if(MaxInput != ""){
      if(Price > MaxInput){
        //console.log(" -- Max Input Reached --");
        PostContainer.children[i].classList.add("hidden");
      }
    }

    if(CityInput.value != ""){
      if(CityInput.value != 'Any' && PostCity  != CityInput.value){
        //console.log(" -- City Input Reached --");
        //console.log(" -- City Input: ", CityInput.value);
        PostContainer.children[i].classList.add("hidden");
      }
    }

    if(FilterCondition != ""){
      if (PostCondition.includes(FilterCondition) == false){
        //console.log(" -- Condition Input Reached --");
        //console.log(" -- Condition Input: ", FilterCondition);
        PostContainer.children[i].classList.add("hidden");
      }
    }
    //console.log(" -- Post text content:", PostContainer.children[i].children[0].children[1].children[0].textContent);
  }
  // console.log(" -- Text User Input:", TextUserInput);
  // console.log(" -- Minimum Price:", MinInput);
  // console.log(" -- Maximum Price:", MaxInput);
  // console.log(" -- Selected City:", CityInput);

}

//Creates new posts fulfilling rquiremnt 3 and 4
function CreatePost(event){
  for(i = 8; i < 12; i++){
    //console.log(" -- Input value is:", Input[i].value);
    //console.log(" -- Loop Number:", i);
    if(Input[i].value.length == 0){
      alert("-- Missing Information --");
      return;
    }
  }
  var name = document.getElementById('post-name-input').value.trim();
  var photoURL = document.getElementById('post-photo-input').value.trim();
  var length = document.getElementById('post-length-input').value.trim();
  var type = document.getElementById('post-type-input').value.trim();
  //var fieldset = document.querySelectorAll('#post-difficulty-fieldset input');
  var difficulty = document.querySelector("#post-difficulty-fieldset input").checked;

  if(document.getElementById('post-difficulty-beginner').checked){
    difficulty = 'beginner';
  }
  if(document.getElementById('post-difficulty-amateur').checked){
    difficulty = 'amateur';
  }
  if(document.getElementById('post-difficulty-intermediate').checked){
    difficulty = 'intermediate';
  }
  if(document.getElementById('post-difficulty-experienced').checked){
    difficulty = 'experienced';
  }
  if(document.getElementById('post-difficulty-veteran').checked){
    difficulty = 'veteran';
  }

  var postRequest = new XMLHttpRequest();
  var reqURL = '/addHike';
  postRequest.open('POST', reqURL);

  console.log(" == Values passed to stringify: ", difficulty);

  var reqBody = JSON.stringify({
    length: length,
    type: type,
    difficulty: difficulty,
    title: name,
    photoURL: photoURL
  });
  console.log("  ==  RequestBody: ", reqBody);



  postRequest.setRequestHeader('Content-Type', 'application/json');
  postRequest.send(reqBody);

    var Condition;

    if(document.getElementById('post-difficulty-beginner').checked == true){
      Condition = 'beginner';
    }
    if(document.getElementById('post-difficulty-amateur').checked == true){
      Condition = 'amateur';
    }
    if(document.getElementById('post-difficulty-intermediate').checked == true){
      Condition = 'intermediate';
    }
    if(document.getElementById('post-difficulty-experienced').checked == true){
      Condition = 'experienced';
    }
    if(document.getElementById('post-difficulty-veteran').checked == true){
      Condition = 'veteran';
    }

    var PostCityDiv = document.createElement('div');
    PostCityDiv.classList.add('post');
    PostCityDiv.setAttribute('data-length', Input[10].value);
    PostCityDiv.setAttribute('data-type', Input[11].value);
    PostCityDiv.setAttribute('data-difficulty', Condition);

    var PostContentDiv = document.createElement('div');
    PostContentDiv.classList.add('post-contents');

    var PostImageDiv = document.createElement('div');
    PostImageDiv.classList.add('post-image-container');

    var PostIMG = document.createElement('img');
    PostIMG.setAttribute('src',  Input[9].value);
    PostIMG.setAttribute('alt',  'User Provided URL');

    var PostInfoDiv = document.createElement('div');
    PostInfoDiv.classList.add('post-info-container');

    var PostInfoa = document.createElement('a');
    PostInfoa.classList.add('post-title');
    PostInfoa.setAttribute('href', '#');
    PostInfoa.textContent = Input[8].value;

    var PostCitySpan = document.createElement('span');
    PostCitySpan.classList.add('post-type');
    PostCitySpan.textContent = '(' + Input[11].value + ')';

    var PostPriceSpan = document.createElement('span');
    PostPriceSpan.classList.add('post-length')
    PostPriceSpan.textContent = Input[10].value;

    PostContainer.appendChild(PostCityDiv);
    PostCityDiv.appendChild(PostContentDiv);
    PostContentDiv.appendChild(PostImageDiv);
    PostImageDiv.appendChild(PostIMG);
    PostContentDiv.appendChild(PostInfoDiv);
    PostInfoDiv.appendChild(PostInfoa);
    PostInfoDiv.appendChild(PostPriceSpan, PostInfoa);
    PostInfoDiv.appendChild(PostCitySpan,PostInfoa);

    SellButtonFunc(event);

}

//Display model and close it as well as clear text fields requirement 1 & 2
function SellButtonFunc(event){
  //console.log("== Sell Button Was Clicked ==");
  //console.log(" -- event:", event);
  //console.log(" -- event.target:", event.target);
  //console.log(" -- eventcurrentTarget:", event.currentTarget);
  //console.log(" -- PopUp:", PopUp);
  var PopUp = event.target.nextElementSibling;
  SellModal.classList.toggle("hidden");
  SellModalBackdrop.classList.toggle("hidden");
  for(i = 0; i < Input.length; i++){
    Input[i].value = "";
  }

}
