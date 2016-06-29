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
    $(".idea-list").prepend("<p>title: " + idea.title  + ", " + "quality: " + idea.quality + ", " + "body: " + idea.body + "</p>")
}

var displayIdeas = function(ideas) {
    ideas.forEach(function(idea){
	displayIdea(idea);
    });
}

