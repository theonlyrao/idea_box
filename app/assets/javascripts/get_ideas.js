function getIdeas() {
    $.ajax({
	method: "GET",
	url: "/api/v1/ideas",
	dataType: "json",
	success: displayIdeas
    })
}

function displayIdea(idea){
    $(".idea-list").prepend("<div class='card card-block' id=" + idea.id + " data-id=" + idea.id + "><h4 class='card-title'><div class=idea-title contenteditable='true'>" + idea.title + "</div><div id=quality>"  + idea.quality + "</div></h4><p class='card-text idea-body' contenteditable='true'>" + idea.body + "</p><a class='card-link delete'>Delete</a><a class='card-link thumbs-up'>Thumbs Up</a><a class='card-link thumbs-down'>Thumbs Down</a></div>")
};

function displayIdeas(ideas) {
    ideas.forEach(function(idea){
	displayIdea(idea);
    });
};
