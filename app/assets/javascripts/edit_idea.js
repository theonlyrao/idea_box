function editIdeaListener(){
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
}
