function changeQualityListener($ideaList){
    $ideaList.delegate(".thumbs-up", "click", function(){
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

    $ideaList.delegate(".thumbs-down", "click", function(){
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
}

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
