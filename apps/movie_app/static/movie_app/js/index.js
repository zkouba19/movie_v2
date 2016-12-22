

// $(document).on("mouseenter", ".posterDiv", function() {
//     $(this).find(":button").show()
// }).on("mouseleave", ".posterDiv", function() {
//     $(this).find(":button").hide()
// });
var favoriteList = {}

$(document).on("click", "img", function() {
    var pic = $(this).attr("src")
    var id = $(this).attr("id")
    
    favoriteList[id]=id
    $(this).fadeOut("slow")
    $.get(`http://www.omdbapi.com/?t=${id}&y=&plot=short&r=json`, function(res){
        $("#favList").append(`<div class="list-group-item" style="display:none"><p id="imgP"><img src="${pic}"></p><p id="picInfo"><span>Title:</span> ${res.Title}<br><span>Actors:</span> ${res.Actors}</p></div>`)
        $(".list-group-item").show("slide", { direction: "right" }, 1000);
        $("#mapFav").append(`<input type="hidden" value="${id}">`)
    })
    $("#movies").html("")
    makePosters()

});
$(document).on("click", "#btnTitle", function() {
    var newTitle = $("#titleSelect option:selected").text()
    if(newTitle == "") {
        $("#movies").html("")
        makePosters()
    }
    else {
        $("#movies").html("")
        $.get(`http://www.omdbapi.com/?t=${newTitle}&y=&plot=short&r=json`, function(res){
            var poster = res.Poster
            var title = res.Title
            $("#movies").append(`<div class="posterDiv" class="col-xs-6 col-lg-4"><img id="${title}"  src="${poster}" loc=""></div>`)
        });
    }
});

// $(document).on("click", "#clearFav", function() {
//     Object.keys(favoriteList).length = 0
//     console.log(favoriteList)
// });

    function makePosters(){
        var arr = []
        var loca = []
        var dataSet = $.getJSON("static/movie_app/js/movies.json", function(){
            for(var i = 0; i < 1586; i++){
                if(dataSet.responseJSON.data[i][8] != arr[arr.length-1]){
                    if (dataSet.responseJSON.data[i][8] != favoriteList[dataSet.responseJSON.data[i][8]]){
                        arr.push(dataSet.responseJSON.data[i][8])
                        loca.push(dataSet.responseJSON.data[i][10])
                        $.get(`http://www.omdbapi.com/?t=${dataSet.responseJSON.data[i][8]}&y=&plot=short&r=json`, function(res){
                            var poster = res.Poster
                            var title = res.Title
                            $("#movies").append(`<div class="posterDiv" class="col-xs-6 col-lg-4"><img id="${title}"  src="${poster}" loc=""></div>`)
                            $(".posterDiv")//.show("slide", { direction: "left" }, 1000);
                        })
                    }
                }
                if (arr.length == 10) {

                    break
                }
            }
        });
    }
$(document).ready(function(){
    makePosters()
}); //document ready tag