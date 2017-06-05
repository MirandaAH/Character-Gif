// An array full of strings containing Harry Potter Character Names
var topics = ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore", "Voldemort",  "Ginny Weasley", "Luna Lovegood", "Neville Longbottom", "Fred Weasley", "George Weasley", "Dobby", "Bellatrix Lestrange", "Sirius Black", "Remus Lupin", "Severus Snape", "Hagrid", "Minerva McGonagall", "Seamus Finnegan", "Nearly Headless Nick"];

//Function to create buttons and append them to the button div
function renderButtons() {
    $("#newButtons").empty();//clearing the button div
    $('#gifArea').empty(); //clearing the gif div
    for (var i = 0; i < topics.length; i++) { //for loop iterating through the topics array
      var a = $("<button>"); //setting a variable to create an html button tag
      a.addClass("topics");//add class to button
      a.attr("data-name", topics[i]);//set data-name to button
      a.attr('onclick', 'getImages(topics[' + i + '])');//set button onclick function to run
      // through the getImages function with the current string in the loop
      a.text(topics[i]);//set text of button to string
      // console.log(a);
      $("#newButtons").append(a);//append the buttons to the button div
    }
}

// Function to access giphy API using AJAX and printing gif images onto gifArea
function getImages (x) {
  $('#gifArea').empty();
  $('#character-form').css('margin-top', '-1890px');
  var APIkey = "dc6zaTOxFJmzC";
  // queryURL, topics[i] will be passed through this function onclick buttons
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +  x  + "&limit=10&rating=pg-13&api_key="+ APIkey;
  $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++){
          // grab animated gif url and set it to a variable
          var defaultAnimatedSrc= response.data[i].images.fixed_height_small.url;
          // grab static gif url and set it to a variable
          var staticSrc= response.data[i].images.fixed_height_small_still.url;
          // grab the gif rating and set it to a variable
          var rating = response.data[i].rating;
          //set variable to create paragraph with rating info
          var p = $('</p>').html("Rating: " + rating + '<br>');
          // set id of each p to a unique number
          p.attr('id', i + 'p');
          p.addClass('gifs');
          // set variable to create image html tag
          var showImage = $('<img>');
          // set src of image to static image
          showImage.attr('src', staticSrc);
          // set class of image to gifImg
          showImage.addClass('gifImg');
          // set data-state of image to still
          showImage.attr('data-state', 'still');
          // set data-still to src static url
          showImage.attr('data-still', staticSrc);
          // set data-animate to src animated url
          showImage.attr('data-animate', defaultAnimatedSrc);
          // append rating and gifs to gifArea
          p.appendTo('#gifArea');
          showImage.appendTo('#' + i + 'p');
        }
    });
  }





//gif playpause
$(document).on('click', '.gifImg', controlGifs);

// function to play/pause gifs
function controlGifs () {
  //create variable to store image current state at time of click
  var state = $(this).attr('data-state');
  // if the state is still
  if (state === 'still') {
    console.log('play');
    // change the src of this image to animate src
    $(this).attr('src', $(this).attr('data-animate'));
    // set state to animate
    $(this).attr('data-state', "animate");
  }else if (state === 'animate'){
    console.log('pause');
    // change the src of this image to static src
    $(this).attr('src', $(this).attr('data-still'));
    // change data-state to still
    $(this).attr('data-state', 'still');
  }
}

//create onclick for the add-character button(character-form) that will create a new button with user input
$('#add-character').on('click', function (event) {
  $('#gifArea').empty();
  // prevents submit button from submitting a form
  event.preventDefault();
  //create a new variable to store user input
  var newCharacter = $('#character-input').val().trim();
  // push user input into topics array
  topics.push(newCharacter);
  console.log(topics);
  //call renderButtons function to print new button with userinput
  renderButtons();
})

//call renderButtons for when game loads
renderButtons();
