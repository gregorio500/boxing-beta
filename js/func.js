/// func.js

// 1:30
var convert_to_min_sec = function(t) {

    var min = Math.floor( t / 60 ) ;
    var sec = Math.floor(t - min*60); // 03

    if (min<10) {  min = "0" + min; }
    if (sec<10) {  sec = "0" + sec; }

    return ""+ min + ":" + sec;
};

//alert( min_sec(123) );


// opis rundy
function setActualRound(next_round)
{
  document.getElementById("actual").innerHTML =  "Selected round: " + next_round;
}

// czas globalny
function setSeconds(seconds)
{
    document.getElementById("walka_seconds").innerHTML =  "Time: " + seconds;
}


function setRound(nr_rundy)
{
  document.getElementById("actual_round").innerHTML =  "Round: " + nr_rundy;
}


function setRoundTextMessage(msg)
{
  document.getElementById("actual_round").innerHTML =  msg
}



function setRoundLength(czas_biezacy,dl_rundy,dl_przerwy)
{
    rundowy = convert_to_min_sec(czas_biezacy);
    document.getElementById("round_length").innerHTML =  "Time: " + rundowy;
}

function logs(txt)
{
    document.getElementById("rounds_fights").innerHTML += txt + "<br/>\n";
}



// klasa definiujaca Walke
// - zawiera rundy, czasy
// - zawiera ciosy
//
function Fight() {

  this.rounds = [],
  this.round_length = [],
  this.round_rest = [],

  this.punches = [[]],
  this.punches_time = [[]]
}


// proste funkcje - czasowe
//-------------------------------------------------------------------------

function play() {


    if (max_rund>0) {
     //  alert("play");
      interval_works = TRUE;
      console.log("play()");

      $( "#actual_round" ).show();
      $( "#round_length" ).show();

      // chowaj niepotrzebe
      $( "#actual" ).hide();
      $( "#new_round" ).hide();
      $( "#walka_seconds" ).hide();
      // zegar
      // asynchronicznie odtwarzac dzwieki
    } else {
        alert("Dodaj rundy!");
    }

}

function pause() {
  //alert("pause");
  interval_works = FALSE;
  console.log("pause()");

}

function stop() {
 // alert("stop");
  interval_works = FALSE;
  czas_walki = 0;
  console.log("stop()");
  aktualna_runda_odtwarzana = 1;

  $( "#actual_round" ).hide();
  $( "#round_length" ).hide();

  $( "#new_round" ).show();
  $( "#walka_seconds" ).show();
}

function save() {
    alert("save");
}

function refresh() {
    location.reload();
}

function play_sound(txt)
{

    if (txt==="bell") {

        var audio1 = new Audio("dzwieki/bell.mp3");
     	audio1.play();

    } else if (txt==="cross") {

        var audio2 = new Audio("dzwieki/cross.mp3");
     	audio2.play();

    }else if (txt==="jab") {

        var audio3 = new Audio("dzwieki/jab.mp3");
     	audio3.play();

    }else if (txt==="lefthook") {

        var audio4 = new Audio("dzwieki/lefthook.mp3");
     	audio4.play();

    }

}



function get_sound(txt)
{

    if (txt==="bell") {

        return new Audio("dzwieki/bell.mp3");


    } else if (txt==="cross") {

        return new Audio("dzwieki/cross.mp3");


    }else if (txt==="jab") {

        return  new Audio("dzwieki/jab.mp3");


    }else if (txt==="lefthook") {

        return new Audio("dzwieki/lefthook.mp3");

    }

    return null;
}



//-------------------------------------------------------------------------



var viewer = function() {

    var i=1;
    console.log("Lista obiektow:");
    for(i=0; i < execute_list.length; i++)
    {
        //alert("ok: " + i);
        console.log("obiekt: " + execute_list[i] );
    }
};


/*
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }
  return arr;
}*/


//-------------------------------------------------------------------------



