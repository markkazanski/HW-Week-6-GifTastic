/*
Display list of buttons/topics

Get user clicks
        Get topic from data-topic, store in variable
        call Giphy API with topic
        display gifs

Get user input to add topics
    Add topic to list

*/



var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=monkeys";

$.ajax({
    url: queryURL,
    method: 'GET'
}).done(function(response) {
    console.log(response);
});

var giftastic = {
    initialize: function(){
        this.displayTopics();
        this.addTopic();
    },

    topicsArray: [
        "Lenin",
        "Trotsky",
        "Che Guevara",
        "Fidel Castro",
        "Mao Zedong",
        "Karl Marx",
        "Malcolm X"
    ],

    displayTopics: function(){
        $("#topic-buttons").empty();

        for(var i=0; i<this.topicsArray.length; i++){
            

            $("#topic-buttons").append(this.makeButton(this.topicsArray[i])); //ads button object to document
        }
    },

    makeButton: function( topic ){ //take topic string returns button object
        var topicButton = $("<button>");
        topicButton.attr("class", "topic-button");
        topicButton.attr("data-topic", topic);
        topicButton.text(topic); //creates button object

        return topicButton;
    },

    addTopic: function(){
        $("#add-topic").on("click", function(){
            var topicInput = $("#topic-input").val();
            
            if(topicInput !== "" ){
                var buttonObject = giftastic.makeButton(topicInput);
                $("#topic-buttons").append(buttonObject); //ads button object to document
                $("#topic-input").val("");
            }
        });
    },
};

$( document ).ready(function() {
    giftastic.initialize();
});