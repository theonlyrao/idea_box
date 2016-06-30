function deleteIdeaListener($ideaList){
    $ideaList.delegate(".delete", "click", function(){
	var ideaId = $(this).parent().data("id");
	$.ajax({
	    type: "DELETE",
	    url: "/api/v1/ideas/" + ideaId,
	    dataType: "json",
	    success: deleteIdea(ideaId)
	})
    })
}

function deleteIdea(ideaId){
    $(".card#" + ideaId).remove();
}

