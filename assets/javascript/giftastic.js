/*
Display list of buttons/topics

Get user clicks
        Get topic from data-topic, store in variable
        call Giphy API with topic
        display gifs

Get user input to add topics
    Add topic to list

*/

var giftastic = {
    initialize: function(){
        this.displayTopics();
        this.addTopic();
        this.getButtonClicks();
        this.getGifClicks();
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

    callGiphy: function( query ){
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13&q="
         + query;
         console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            $("#gifs-container").empty();
            for(var i=0; i<response.data.length; i++){
                console.log(response.data[i].slug);
                var div = $("<div>"); //create gif container, 
                div.attr("class", "gif-container");
                var img = $("<img>");
                img.attr("src", response.data[i].images.original_still.url);
                img.attr("data-still", response.data[i].images.original_still.url);
                img.attr("data-animate", response.data[i].images.original.url);
                img.attr("data-state", "still");
                var rating = $("<p>");
                rating.text(response.data[i].rating);
                rating.attr("class", "rating");
                div.append(img);
                div.append(rating);
                $("#gifs-container").append(div);
                //create image object, add src, data-still, data-animate
            }
            console.log(response); //display gifs

        });
    },

    getButtonClicks: function(){
        $(document).on("click", ".topic-button", function(){
            var topic = $(this).attr("data-topic"); //get topic from clicked button
            
            giftastic.callGiphy(topic); //use ajax to query Giphy API
        });
    },

    getGifClicks: function(){
        $(document).on("click", ".gif-container img", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
    },
};

$( document ).ready(function() {
    giftastic.initialize();
});