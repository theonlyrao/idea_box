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

    $(".idea-list").delegate(".thumbs-down", "click", function(){
	var ideaId = $(this).parent().data("id");
	var currentQuality = $(this).parent().find("#quality").text()
	var newQuality = thumbsDown(currentQuality)
	$(this).parent().find("#quality").text(newQuality)
	$.ajax({
	    type: "PATCH",
	    url: "api/v1/ideas/" + ideaId,
	    data: { idea: { quality: newQuality } },
	    dataType: "json",
	    success: null
	})
    })

    var contents = $(".idea-list").html();
    $(".idea-list").delegate(".idea-title", "blur", function() {
	if (contents != $(".idea-list").html()){
            var newTitle = $(this).html();
	    var ideaId = $(this).parent().parent().data("id");
	    $.ajax({
		type: "PATCH",
		url: "api/v1/ideas/" + ideaId,
		data: { idea: { title: newTitle } },
		dataType: "json",
		success: null
	    })
	}
    });

    $(".idea-list").delegate(".idea-body", "blur", function() {
	if (contents != $(".idea-list").html()){
            var newBody = $(this).html();
	    var ideaId = $(this).parent().data("id");
	    $.ajax({
		type: "PATCH",
		url: "api/v1/ideas/" + ideaId,
		data: { idea: { body: newBody } },
		dataType: "json",
		success: null
	    })
	}
    });


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

    function thumbsDown(currentQuality){
	if (currentQuality === "genius"){
	    return "plausible";
	}
	else if (currentQuality === "plausible"){
	    return "swill";
	}
	else {
	    return currentQuality;
	}
    }

    function displayIdea(idea){
	$(".idea-list").prepend("<div class='card card-block' id=" + idea.id + " data-id=" + idea.id + "><h4 class='card-title'><div class=idea-title contenteditable='true'>" + idea.title + "</div><div id=quality>"  + idea.quality + "</div></h4><p class='card-text idea-body' contenteditable='true'>" + idea.body + "</p><a class='card-link delete'>Delete</a><a class='card-link thumbs-up'>Thumbs Up</a><a class='card-link thumbs-down'>Thumbs Down</a></div>")
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

