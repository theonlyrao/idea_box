$(document).ready(function(){
    getIdeas();
    saveIdeaListener();

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

    $("#search").keyup(function(){
	var text = $(this).val();
	var titleResults = $(".idea-list .card .card-title .idea-title:contains(" + text + ")").parent().parent();
	var bodyResults = $(".idea-list .card .idea-body:contains(" + text + ")").parent();
	$(".idea-list .card").hide();
	titleResults.show();
	bodyResults.show();
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

    function deleteIdea(ideaId){
	$(".card#" + ideaId).remove();
    }

});

