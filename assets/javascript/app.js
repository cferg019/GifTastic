var tvShows = ["Spongebob Squarepants", "Parks & Rec", "Saved by the Bell", "Rocko's Modern Life", "Community", "The Office", "30 Rock"];

// function to loop through 'tvShows' array to append to button display div
function createButtons() {
    $("#buttonDisplay").empty();
    for (var i = 0; i < tvShows.length; i++) {
        var a = $("<button>");
        a.addClass("tvButtons");
        a.attr("data-show-name", tvShows[i]);
        a.text(tvShows[i]);
        a.on("click", handleButtonClick)
        $("#buttonDisplay").append(a);
    }
}

// on click event for adding new tv show buttons and appending to button display div
$("#addNewShow").on("click", function (event) {
    event.preventDefault();
    var userShowInput = $("#newSearchInput").val().trim();
    tvShows.push(userShowInput);
    // clear input field after submitting option
    $("#newSearchInput").val("")
    createButtons();
});

// function building on click event for buttons created in createButtons function
function handleButtonClick(event) {
    event.preventDefault();
    var tvShowURLinput = $(this).attr("data-show-name");
    //endcodeURI --> translates spaces in user input into readable string
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURI(tvShowURLinput) + "&api_key=EwRRkwAvsMmOUtLpLz92yNlczXJOCBlb&limit=25";
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;

        // clear out gif display before displaying next show's gifs 
        $("#showGifsHere").empty();
        // loop through object results to display the 12 gifs called
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var p = $("<p>");
            var tvShowImage = $("<img>");

            p = "Rating: " + results[i].rating + "<br>";
            tvShowImage.attr("src", results[i].images.fixed_height_still.url)
    
            gifDiv.addClass("float-md-left");
            gifDiv.append(p);
            gifDiv.append(tvShowImage);

            $("#showGifsHere").append(gifDiv);
        }
    })
}

$(document).on("click", "img", function() {
    console.log("hi there");        

});


 $("body").on("click", "img", function() {
    var src = $(this).attr("src");
  if($(this).hasClass("playing")){
     //stop
     $(this).attr("src", src.replace(".gif", "_s.gif"))
     $(this).removeClass("playing");
  } else {
    //play
    $(this).addClass("playing");
    $(this).attr("src", src.replace("_s.gif", ".gif"))
  }
});



createButtons();

