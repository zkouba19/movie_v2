$(document).on("mouseenter", ".posterDiv", function() {
    $(this).find(":button").show()
    // $(this).find("img").css("visibility","hidden")
}).on("mouseleave", ".posterDiv", function() {
    $(this).find(":button").hide()
    // $(this).find("img").css("visibility","visible")
});
$(document).ready(function(){
    var arr = []
    var locations = []
    var dataSet = $.getJSON("static/movie_app/js/movies.json", function(){
        for(var i = 0; i < 1586; i++){
            if(dataSet.responseJSON.data[i][8] != arr[arr.length-1]){
                arr.push(dataSet.responseJSON.data[i][8])
                $.get(`http://www.omdbapi.com/?t=${dataSet.responseJSON.data[i][8]}&y=&plot=short&r=json`, function(data){
                    var poster = data.Poster
                    $("#movies").append(`<div class="posterDiv"><button>dsds</button><img id="${data.imdbID}"  src="${poster}"></div>`)
                    $("button").hide()
                })
            }
            if (arr.length == 10) {
                break
            }
        }
    });

    $('#submit').click(function(){
      createMarker();
      
    })
}); //document ready tag
