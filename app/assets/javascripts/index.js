$(document).ready(function(){
    $.ajax({
	method: "GET",
	url: "/api/v1/ideas",
	dataType: "json",
	success: displayIdeas
    })

    $("#save-button").click(function(){
	var newTitle = $("#title").val();
	var newBody = $("#body").val();
	var qualityParser = $("#quality").val();
	if (qualityParser === ""){
	    var newQuality = "swill";
	}
	else {
	    var newQuality = qualityParser;
	}
	$.ajax({
	    type: "POST",
	    url: "/api/v1/ideas",
	    data: { idea: { title: newTitle, body: newBody, quality: newQuality } },
	    dataType: "json",
	    success: displayIdea
	})
	$(".new-idea").trigger("reset");
    })
});

var displayIdea = function(idea){
    $(".idea-list").prepend("<div class='card card-block' id=idea-" + idea.id + "><h4 class='card-title'>" + idea.title + ", "  + idea.quality + "</h4><p class='card-text'>" + idea.body + "</p><a href='#' class='card-link'>Delete</a><a href='#' class='card-link'>Thumbs Up</a><a href='#' class='card-link'>Thumbs Down</a></div>")
};



var displayIdeas = function(ideas) {
    ideas.forEach(function(idea){
	displayIdea(idea);
    });
}

