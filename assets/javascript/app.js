var animals = ["llama", "lions", "bears"];

function createButtons () {
    $("#buttonDisplay").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", animals[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(animals[i]);
          // Adding the button to the HTML
          $("#buttonDisplay").append(a);
    }
}

$("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#newSearchInput").val().trim();
    // The movie from the textbox is then added to our array
    animals.push(animal);

    // calling renderButtons which handles the processing of our movie array
    createButtons();
  });

createButtons();