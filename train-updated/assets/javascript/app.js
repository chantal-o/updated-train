

    //Initialize Firebase
    const firebaseConfig = {
    apiKey: "AIzaSyDh6AGHSVttSvoZ2TahAikZsXlGJNNYPY0",
    authDomain: "train-71877.firebaseapp.com",
    databaseURL: "https://train-71877.firebaseio.com",
    projectId: "train-71877",
    storageBucket: "train-71877.appspot.com",
    messagingSenderId: "231718925568",
    appId: "1:231718925568:web:b2b56dc5e5f4dbf3ddefe5",
    measurementId: "G-7Y3V0D3SCG"
  };

    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database
    var database = firebase.database();


    // //Grabs user Input
    $("#addTrain").on("click", function () {


        var trainName = $("#nameInput").val().trim();
        var trainDestination = $("#destinationInput").val().trim();
        var timeInput = $("#timeInput").val().trim();
        var trainFrequency = $("#frequencyInput").val().trim();


        //military time
        var timeConverted = moment(timeInput, "HH:mm").subtract("1,years");
        console.log(timeConverted)
        var currentTime = moment();
        console.log("current military time:  " + currentTime.format("HH:mm"));

        //Difference between the times
        var diffTime = currentTime.diff(moment(timeConverted), "minutes");
        //Time Apart
        var trainRemainder = diffTime % trainFrequency;
        //Minutes Until Train
        var minutesLeft = trainFrequency - trainRemainder;
        //Next Train
        var nextTrain = moment().add(minutesLeft, "minutes").format("HH:MM a");

        //Creates local object to store train data
        var newTrain = {
            trainName: trainName,
            trainDestination: trainDestination,
            timeInput: timeInput,
            trainFrequency: trainFrequency,
            minutesAway: minutesLeft,
            nextArrival: nextTrain
        }

        database.ref().push(newTrain);

         //Clear all of text-boxes
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#timeInput").val("");
        $("#frequencyInput").val("");


        return false;
    })

    // Firebase watcher + initial loader
        database.ref().on("child_added", function (childSnap) {
        trainName = childSnap.val().trainName;
        trainDestination = childSnap.val().trainDestination;
        timeInput = childSnap.val().timeInput;
        trainFrequency = childSnap.val().trainFrequency;

        var minutesAway = childSnap.val().minutesAway;
        var nextArrival = childSnap.val().nextArrival;

        //appends to html table
        $("#train-table").append(
            "<tr><td>" + trainName + "</td>" +
            "<td>" + trainDestination + "</td>" +
            "<td>" + trainFrequency + "</td>" +
            "<td>" + nextArrival + "</td>" +
            "<td>" + minutesAway + "</td></tr>"
        )
    });
