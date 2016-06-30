function saveIdeaListener() {
    $("#save-button").click(function(){
	var newTitle = $("#title").val();
	var newBody = $("#body").val();
	var qualityParser = $("#quality").val().toLowerCase();
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
}
