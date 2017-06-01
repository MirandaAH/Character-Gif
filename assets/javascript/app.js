var topics = ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore", "Voldemort",  "Ginny Weasley", "Luna Lovegood", "Neville Longbottom", "Fred Weasley", "George Weasley", "Dobby", "Bellatrix Lestrange", "Sirius Black", "Remus Lupin", "Severus Snape", "Hagrid", "Minevra McGonagall", "Seamus Finnegan", "Nearly Headless Nick"];
var img = $('<img class="gifs">');

renderButtons();


function renderButtons() {
        $("#newButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("topics");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#newButtons").append(a);
        }
        $('.topics').on('click', function () {
          getImages();
        });
      }

function getImages () {
  var currentChoice = $(this).attr('data-name');
  var APIkey = "dc6zaTOxFJmzC";

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +  currentChoice  + "&limit=10&rating=pg&api_key="+ APIkey;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
      console.log(response)
      var images = $('#giphs');
      for( var i = 0 ; i < response.data.length; i++) {

        img.attr('src', response.data[i].fixed_height_still.url);
        images.append(img);
      }
    });
}
$('.gifs').on('click', function () {
  img.attr('src', response.data[i].fixed_height.url);
});
