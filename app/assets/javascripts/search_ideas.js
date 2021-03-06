$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function searchIdeasListener(){
    $("#search").keyup(function(){
	var text = $(this).val();
	var titleResults = $(".idea-list .card .card-title .idea-title:contains(" + text + ")").parent().parent();
	var bodyResults = $(".idea-list .card .idea-body:contains(" + text + ")").parent();
	$(".idea-list .card").hide();
	titleResults.show();
	bodyResults.show();
    })
}
