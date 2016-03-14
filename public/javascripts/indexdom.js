// Tourlist array for filling the table with the tours available
var tourList = [];

// DOM Ready =========
$(document).ready(function(){
	//populateTable();
	$('#btnShowAddPoi').on('click', addPoiTable);
	$('#btnHideAddPoi').on('click', hideAddPoiTable);

});

// Functions ======

// Fill tourList table with data
function populateTable(){

	// Empty Content String
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON('/tours', function( data ){
		tourList = data;

			// For each item in our JSON, add a table row and cells to the content string
			$.each(data,function(){
				tableContent += '<tr>';
				tableContent += '<td>' + this.title + '</td>';
				tableContent += '<td><a href="#" class="linkdeletetour" rel="' + this._id + '">delete</a></td>';

			});

			// Inject Content onto HTML
			$('#tourList table tbody').html(tableContent);

	});
};

function addPoiTable(event){

	event.preventDefault();
	console.log("clicked");
	var addPoiTableContent = '';
	//addPoiTableContent += '<form id="addPoiForm" enctype="multipart/form-data" action="/addpoi" method="post">';
	addPoiTableContent += '<fieldset>';
	addPoiTableContent += '<input id="inputPoiName" type="text" placeholder="POI Name"><br>';
	addPoiTableContent += '<input id="inputPoiDescription" type="text" placeholder="POI Description"><br>';
	addPoiTableContent += '<input id="inputPoiLocation" type="text" placeholder="Location(Lat,Long)"><br>';
	addPoiTableContent += '<input id="inputPoiAddress" type="text" placeholder="Address"><br>';
	//addPoiTableContent += '<input id="PoiMedia" type="file", placeholder="POI Media (still in txt format)" multiple><br>';
	addPoiTableContent += '<button id="btnAddPoi">Add Poi</button><button id="btnHideAddPoi">Hide</button>';
	addPoiTableContent += '</fieldset>';
	$('#addP').html(addPoiTableContent);
	$('#btnHideAddPoi').on('click', hideAddPoiTable);
	$('#btnAddPoi').on('click', addPoi);
	
};

function hideAddPoiTable(event){
	event.preventDefault();
	var hideAddPoiTableContent = '';
	hideAddPoiTableContent += '<button id="btnShowAddPoi">Add Poi</button>';
	$('#addP').html(hideAddPoiTableContent);
	$('#btnShowAddPoi').on('click', addPoiTable);
};

function addPoi(event){
	event.preventDefault();
	var newPoi = {
		'poiname' : $('addP fieldset input#inputPoiName').val(),
		'poidescription' : $('addP fieldset input#inputPoiDescription').val(),
		'poilocation' : $('addP fieldset input#inputPoiLocation').val(),
		'poiAddress' : $('addP fieldset input#inputPoiAddress').val()
	}

	$.ajax({
		type:'POST',
		data: newPoi,
		url: '/addpoi',
		dataType: 'JSON'
	}).done(function( response){
		// Check for successful blank response
		if (response.msg === ''){
			// Clear the form inputs
			$('addP fieldset input').val('');
		}
		else{
			// If something goes wrong, alert
			alert('Error: ' + response.msg);
		}
	});
};