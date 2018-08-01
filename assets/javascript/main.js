
var movies = ["cats", "dogs", "pizza", "lions", "falling", "texas ranger", "pickup truck", "css"];


function displaySearchInfo() {
    $(".show-movie-info").empty();
    var clickedValue = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedValue + "&api_key=xl2g2fBoLlaf4I46IWkUA9yZES0KiLUt&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var location = response.data;

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
            var line = $("<hr>").addClass("line");
            $(".show-movie-info").prepend(newDiv).prepend(line);
        };

    });
};


function playPause() {
    var dataState = $(this).attr("data-state");

    if (dataState === "paused") {
        $(this).attr("data-state", "play");
        var newSrc = $(this).attr("data-play");
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