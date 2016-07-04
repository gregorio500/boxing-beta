// func.js
/*$("mybuttons").unbind();
$("mybuttons").getLabels().unbind();
jQuery.fn.getLabels = function () {
    return this.map(function () {
        var parentLabels = $(this).parents('label').get();
        var associatedLabels = this.id ? associatedLabels = $("label[for='" + this.id + "']").get() : [];
        return parentLabels.concat(associatedLabels);
    });
};*/

var convert_to_min_sec = function(t) {

    var min = Math.floor( t / 60 ) ;
    var sec = Math.floor(t - min*60); // 03

    if (min<10) {  min = "0" + min; }
    if (sec<10) {  sec = "0" + sec; }

    return ""+ min + ":" + sec;
};




// the round description
function setActualRound(next_round)
{
  document.getElementById("actual").innerHTML =  "Selected round: " + next_round;
}

// global time
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




// object contains amount of rounds, round length, the amount of time for rest, type of punches and the punches placed on the timeline
function Fight() {

  this.rounds = [],
  this.round_length = [],
  this.round_rest = [],

  this.punches = [[]],
  this.punches_time = [[]]
}


// Play

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

    } else {
        alert("Dodaj rundy!");
    }

}

function pause() {
  interval_works = FALSE;
  console.log("pause()");

}

function stop() {
  interval_works = FALSE;
  fight_timer = 0;
  console.log("stop()");
  current_play_round = 1;

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

        var audio1 = new Audio("sounds/bell.mp3");
     	audio1.play();

    } else if (txt==="cross") {

        var audio2 = new Audio("sounds/cross.mp3");
     	audio2.play();

    }else if (txt==="jab") {

        var audio3 = new Audio("sounds/jab.mp3");
     	audio3.play();

    }else if (txt==="lefthook") {

        var audio4 = new Audio("sounds/lefthook.mp3");
     	audio4.play();

    }else if (txt==="righthook") {

        var audio5 = new Audio("sounds/lefthook.mp3");
     	audio5.play();

    }else if (txt==="leftuppercut") {

        var audio6 = new Audio("sounds/leftuppercut.mp3");
     	audio6.play();

    }else if (txt==="rightuppercut") {

        var audio7 = new Audio("sounds/rightuppercut.mp3");
     	audio7.play();

    }else if (txt==="overhandpunch") {

        var audio8 = new Audio("sounds/overhandpunch.mp3");
     	audio8.play();

    }


}



function get_sound(txt)
{

    if (txt==="bell") {

        return new Audio("sounds/bell.mp3");


    } else if (txt==="cross") {

        return new Audio("sounds/cross.mp3");


    }else if (txt==="jab") {

        return  new Audio("sounds/jab.mp3");


    }else if (txt==="lefthook") {

        return new Audio("sounds/lefthook.mp3");

    }else if (txt==="righthook") {

        return new Audio("sounds/righthook.mp3");

    }else if (txt==="leftuppercut") {

        return new Audio("sounds/leftuppercut.mp3");

    }else if (txt==="rightuppercut") {

        return new Audio("sounds/rightuppercut.mp3");

    }else if (txt==="overhandpunch") {

        return new Audio("sounds/overhandpunch.mp3");

    }

    return null;
}



//-------------------------------------------------------------------------


//View for console

var viewer = function() {

    var i=1;
    console.log("Objects list:");
    for(i=0; i < execute_list.length; i++)
    {

        console.log("Object: " + execute_list[i] );
    }
};
