  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuen2xGLMIMzzpZ5N4wr--bN1y3PR6_iM",
    authDomain: "train-scheduler-e926b.firebaseapp.com",
    databaseURL: "https://train-scheduler-e926b.firebaseio.com",
    projectId: "train-scheduler-e926b",
    storageBucket: "",
    messagingSenderId: "836496375878"
  };
  
  firebase.initializeApp(config);
	
	//Create a variable to reference database
  	var database = firebase.database();

  //Capture Submit Button Click
  $("#add-train").on("click", function(event) {
  	event.preventDefault();
  	
  	//Grab values from text boxes
  	var trainName = $("#train-name").val().trim();
  	var trainDest = $("#destination").val().trim();
  	var trainTime = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
  	var trainFreq = $("#frequency").val().trim();
  	
  	//Creating local object stores train data
  	var newTrain = {
  		train_name: trainName,
  		destination: trainDest,
  		train_time: trainTime,
  		frequency: trainFreq,
 	};

	//Upload new train data into database
	database.ref().push(newTrain);

  	//Console log snapshot
  	console.log(newTrain.train_name);
  	console.log(newTrain.destination);
  	console.log(newTrain.train_time);
  	console.log(newTrain.frequency);


  	//Clears text input fields
  	$("#train-name").val("");
  	$("#destination").val("");
  	$("#train-time").val("");
  	$("#frequency").val("");

  	return false;
 
 });

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	

	console.log(childSnapshot.val());

	//Store data into variables
	var trainName = childSnapshot.val().train_name;
	var trainDest = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().train_time;
	var trainFreq = childSnapshot.val().frequency;

	//Log the train info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime);
	console.log(trainFreq);

	var trainTimeDone = moment().diff(moment.unix(trainTime), "minutes");
	var remainingMin = moment().diff(moment.unix(trainTime), "minutes")  % trainFreq;
	var minutes = trainFreq - remainingMin;
	var arrivalTime = moment().add(minutes, "m").format("hh:mm A");

	//Add each train data to the the table
  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" +
  	 trainDest + "</td><td>" + trainFreq + "</td><td>" + arrivalTime +
  	  "</td><td>" + minutes + "</td>");

});