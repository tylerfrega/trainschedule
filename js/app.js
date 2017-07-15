
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9eJ9-nnxe3-10dDmpCXnG36oU0bL6jko",
    authDomain: "traintimes-4bb21.firebaseapp.com",
    databaseURL: "https://traintimes-4bb21.firebaseio.com",
    projectId: "traintimes-4bb21",
    storageBucket: "",
    messagingSenderId: "1081441561806"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

        var firstTrainTime;
        var frequency;
        var trainName = "";
        var destination = "";
        

        // console.log('buts '+ minutesTillTrain);
        // console.log('buts ' + nextArrival.format('hh:mm'));

       // var minutesAway = (moment().diff(moment(), startDate);
        

        // Capture Button Click
        $("#submit").on("click", function(event) {
            event.preventDefault();


            // Grabbed values from text boxes
            firstTrainTime = $('#firstTrainTime').val();
            frequency = $("#frequency").val().trim();
            trainName = $("#trainName").val().trim();
            destination = $("#destination").val().trim();

            var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var remainder = diffTime % frequency;
            var minutesTillTrain = frequency - remainder;
            var nextArrival = moment().add(minutesTillTrain, "minutes");
            var nextTrain = moment(nextArrival).format("hh:mm");
            
            


            // Code for handling the push
            database.ref().push({
                trainName: trainName,
                destination: destination,
                frequency: frequency,
                minutesTillTrain: minutesTillTrain,
                nextTrain: nextTrain,
                

                
            });


        });

        database.ref().on("child_added", function(childSnapshot){
        	console.log("childSnapshot: ");
        	console.log(childSnapshot);
			console.log("childSnapshot.val():");
			console.log(childSnapshot.val());
			$("#info").append("<tr><td>"+ childSnapshot.val().trainName + "</td><td>" 
                                + childSnapshot.val().destination + "</td><td>" 
                                + childSnapshot.val().frequency + "</td> +<td>"
                                + childSnapshot.val().nextTrain + "</td> +<td>"
                                + childSnapshot.val().minutesTillTrain + "</td> +</tr>")

        })





