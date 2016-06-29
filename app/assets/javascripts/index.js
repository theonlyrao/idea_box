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

    $(".idea-list").delegate(".delete", "click", function(){
	var ideaId = $(this).parent().data("id");
	$.ajax({
	    type: "DELETE",
	    url: "/api/v1/ideas/" + ideaId,
	    dataType: "json",
	    success: deleteIdea(ideaId)
	})
    })

    $(".idea-list").delegate(".thumbs-up", "click", function(){
	var ideaId = $(this).parent().data("id");
	var currentQuality = $(this).parent().find("#quality").text()
	var newQuality = thumbsUp(currentQuality)
	$(this).parent().find("#quality").text(newQuality)
	$.ajax({
	    type: "PATCH",
	    url: "api/v1/ideas/" + ideaId,
	    data: { idea: { quality: newQuality } },
	    dataType: "json",
	    success: null
	})
    })

    function thumbsUp(currentQuality){
	if (currentQuality === "swill"){
	    return "plausible";
	}
	else if (currentQuality === "plausible"){
	    return "genius";
	}
	else {
	    return currentQuality;
	}
    }

    function displayIdea(idea){
	$(".idea-list").prepend("<div class='card card-block' id=" + idea.id + " data-id=" + idea.id + "><h4 class='card-title'>" + idea.title + ",<div id=quality>"  + idea.quality + "</div></h4><p class='card-text'>" + idea.body + "</p><a class='card-link delete'>Delete</a><a class='card-link thumbs-up'>Thumbs Up</a><a href='#' class='card-link'>Thumbs Down</a></div>")
    };

    function displayIdeas(ideas) {
	ideas.forEach(function(idea){
	    displayIdea(idea);
	});
    };

    function deleteIdea(ideaId){
	$(".card#" + ideaId).remove();
    }

});

