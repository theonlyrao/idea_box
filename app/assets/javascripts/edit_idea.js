function editIdeaListener($ideaList){
    var contents = $ideaList.html();
    $ideaList.delegate(".idea-title", "blur", function() {
	if (contents != $ideaList.html()){
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

    $ideaList.delegate(".idea-body", "blur", function() {
	if (contents != $ideaList.html()){
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
