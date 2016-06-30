$(document).ready(function(){
    var ideaList = $(".idea-list");
    
    getIdeas();
    saveIdeaListener();
    deleteIdeaListener(ideaList);
    changeQualityListener();
    editIdeaListener();
    searchIdeasListener();
});

