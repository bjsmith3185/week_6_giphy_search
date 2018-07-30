

var movies = ["cats", "dogs", "cows", "lions"];


function displaySearchInfo() {
    $(".show-movie-info").empty();
    var clickedValue = $(this).attr("data-name");
    // console.log(clickedValue);


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedValue + "&api_key=xl2g2fBoLlaf4I46IWkUA9yZES0KiLUt&limit=10"

    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var location = response.data;
        // console.log(response);
        // console.log("this is location: " + location);


        for (var i = 0; i < location.length; i++) {
            var still = location[i].images.fixed_height_still.url;
            var video = location[i].images.fixed_height.url;
            var rating = location[i].rating;

            var newDiv = $("<div>");
            newDiv.addClass("gif-div").addClass("smallDiv");
            var newImg = $("<img>");
            newImg.attr("src", still).attr("data-pause", still).attr("data-play", video).attr("data-state", "paused").addClass("gif-btn");
            var newP = $("<div>");
            newP.text("Rated: " + rating);

            newDiv.append(newImg).append(newP);
            $(".show-movie-info").prepend(newDiv).prepend("<hr>");
        };


        
        // https://media2.giphy.com/media/eDgmbiQcujjsA/480w_s.jpg
        // width: 480, height 270;

        
        // https://media3.giphy.com/media/eDgmbiQcujjsA/giphy.mp4
        // width: 480, height: 270;



    });
};


function playPause() {

    var dataState = $(this).attr("data-state");
    console.log("this is dataState: " + dataState);

    if (dataState === "paused") {
      
        $(this).attr("data-state", "play");

        var newSrc = $(this).attr("data-play");
        console.log(newSrc);
        $(this).attr("src", newSrc);



    } else if (dataState === "play") {
        $(this).attr("data-state", "paused");

        var newSrc = $(this).attr("data-pause");
        $(this).attr("src", newSrc);

    };

};


function renderButtons() {
    
    $("#buttons-view").empty();
   
    for (var i = 0; i < movies.length; i++) {
     
        var a = $("<button>");
        a.addClass("movie");
        a.attr("data-name", movies[i]);
        a.text(movies[i]);
        $("#buttons-view").append(a);
    };
};


$("#add-movie").on("click", function (event) {
    event.preventDefault();

    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    renderButtons();
    $("#movie-input").val("");

});

$("#reset").on("click", function() {
    $(".show-movie-info").empty();
    $("#buttons-view").empty();
    renderButtons();
})

$(document).on("click", ".movie", displaySearchInfo);


// click to play/pause
$(document).on("click", ".gif-btn", playPause);

renderButtons();