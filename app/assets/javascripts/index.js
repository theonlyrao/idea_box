$(document).ready(function(){
    getIdeas();

    var $ideaList = $(".idea-list");    
    saveIdeaListener();
    deleteIdeaListener($ideaList);
    changeQualityListener($ideaList);
    editIdeaListener($ideaList);
    searchIdeasListener();
});

