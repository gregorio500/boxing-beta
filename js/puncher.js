// puncher.js



var TRUE = 1;
var FALSE = 0;
var interval_works = FALSE;
var czas_walki = 0;

var execute_list = [];
var len_round = 0;
var len_rest = 0;
var actual_round_selected = 1; // current round
var next_round = 1;

var walk = new Fight();
var actual_punch_now = 1; // current punch


var aktualna_runda_odtwarzana = 1;
var czas_rundowy  = 0;

var max_rund = 0;
//-----------------------------------------------


function clear_all()
{
    // clear out from console
    document.getElementById("rounds_fights").innerHTML  = "";
    walk = new Fight();
    actual_round_selected = 1;
    next_round = 1;
    setActualRound(next_round); // komunikat

    aktualna_runda_odtwarzana = 1;
    czas_rundowy  = 0;

    stop();

    console.clear();
    console.log("Clear out!");
    max_rund = 0;
}


function addRound(walk)
{
    // next round and save it
    actual_round_selected = next_round;
    logs("Round "+actual_round_selected+ "  Time: " +len_round+ "s   Rest: " + len_rest + "s ");


    //
	walk.rounds.push(actual_round_selected);
	walk.round_length[actual_round_selected] = len_round;
	walk.round_rest[actual_round_selected] = len_rest;

	// punches
    walk.punches[actual_round_selected] = [];
    walk.punches_time[actual_round_selected] = [] ;

    // set of variables
	actual_punch_now = 1;
    setActualRound(next_round);

    max_rund = next_round;
    next_round ++;
}



function addPunch(walk,punchers,seconds) {

    console.log("actual_round_selected: " + actual_round_selected)
    console.log("actual punch: " + actual_punch_now);
    console.log("puncher:" + punchers);
    console.log("seconds" + seconds)
    console.log(walk);


    if (typeof(walk.punches[actual_round_selected]) == 'undefined') {
       walk.punches[actual_round_selected] = new Array();
    }

    if (typeof(walk.punches_time[actual_round_selected]) == 'undefined') {
       walk.punches_time[actual_round_selected] = new Array();
    }
    walk.punches[actual_round_selected][actual_punch_now] = punchers;
    walk.punches_time[actual_round_selected][actual_punch_now] = seconds ;



    actual_punch_now ++;
}





//--------------------------------------------------------


var czas_rundy = walk.rounds[aktualna_runda_odtwarzana];
var czas_po_rundzie = walk.round_rest[aktualna_runda_odtwarzana];





//------------------------------------------------------------------------------------
//   TIME  ///
//------------------------------------------------------------------------------------
$(function() {

setRound(1);

// ZEGAR
setInterval(function () {
//-----------------------------------------------------------------

// play punch from given seconds

if (interval_works == TRUE)
{

    setSeconds(czas_walki);
    setRoundLength(czas_rundowy,len_round,len_rest);

    var all_time = len_round + len_rest;


    if (czas_rundowy == all_time) {

         czas_rundowy = 0;
         aktualna_runda_odtwarzana ++;
         setRound(aktualna_runda_odtwarzana);
    }

    if (aktualna_runda_odtwarzana>max_rund) {
        interval_works = FALSE;
        setRoundTextMessage("End fight!");
        return;
    }

    if (  czas_rundowy == 0) {
        play_sound("bell");
        //setRoundTextMessage("Fight!");
    }

    if (czas_rundowy == len_round  ) {
        play_sound("bell");
        setRoundTextMessage("Break");
    }


    var my_punch_in_sec = new Array();
    try {

       // browsing the punches
       if (walk.punches != undefined)
       {


            // i - number of round
            // take name of punches for given second
           for (var i=aktualna_runda_odtwarzana; i<=aktualna_runda_odtwarzana; i++)
           {
               if (walk.punches[i] != undefined) {

                   console.log(walk.punches[i]);

                   // j - number of punch for given round
                   for (var j=1; j<=walk.punches[i].length; j++)
                   {
                       if (walk.punches[i][j] != undefined){

                           console.log(walk.punches[i][j] + " time: " + walk.punches_time[i][j]);

                           if ( walk.punches_time[i][j] == czas_rundowy)
                           {
                              my_punch_in_sec.push("" + walk.punches[i][j]);
                           }
                       }

                   } // for
               } // walk.punches[i]
           }//for - walk.punches
       }

      } catch(Exception) {  }

      // play given sounds for given second!
      if (my_punch_in_sec.length>0) {
            console.log("Punches: ")
            for (var t=0; t < my_punch_in_sec.length; t++) {

                  console.log(" - " + my_punch_in_sec[t] + " time: "+ czas_rundowy);
                  //play_sound(my_punch_in_sec[t]); // just one sound

                  play_all_sounds(my_punch_in_sec[t]); // many sounds
            }
      }



      // if round ended then I change the round j
      //aktualna_runda_odtwarzana


} // interval_works








// increase counter
if (interval_works == TRUE) {
    czas_walki++;
    czas_rundowy++;
}
//-----------------------------------------------------------------
},1000);






 });



// top menu
$(function() {

  // punches
  $( ".controls" ).hide();

  //
  $( "#actual_round" ).hide();
  $( "#round_length" ).hide();


    $( "#new_round" ).click(function(){

        addRound(walk);
        $( "#slider-range-min" ).hide();
        $( "#slider-range-min-rest" ).hide();

        $( ".controls" ).show();

    });

    $( "#show" ).click(function(){


        console.log(walk);


        // browsing the punches
        if (walk.punches != undefined)
        {
             // i - number of round
            for (var i=1; i<=walk.punches.length; i++)
            {
                if (walk.punches[i] != undefined) {

                    console.log(walk.punches[i]);
                    //
                    for (var j=1; j<=walk.punches[i].length; j++)
                    {
                        if (walk.punches[i][j] != undefined)
                        console.log(walk.punches[i][j] + " time: " + walk.punches_time[i][j]);

                    }
                }
            }
        }

   });

   $( "#clear" ).click(function(){
        clear_all();
   });

  $( "#refresh" ).click(function(){
        refresh();
   });
});




$(function() {


  // round
  $( "#slider-range-min" ).slider({

    range: "min",
    value: 60,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#amount" ).val(  convert_to_min_sec( ui.value)  );
      len_round = ui.value; // ilosc sek - runda
      len_rest = ui.value;

      $('#slider-range-min-rest').slider( "option", "max",  len_round );
      $( "#rest" ).val(  convert_to_min_sec( len_round )  );


      $('#slider-range-jab').slider( "option", "max",  len_round );
      $('#slider-range-jab').slider( "option", "value",  1 );
      $( "#jab" ).val(  convert_to_min_sec( 1 )  );

      $('#slider-range-cross').slider( "option", "max",  len_round );
      $('#slider-range-cross').slider( "option", "value",  1 );
      $( "#cross" ).val(  convert_to_min_sec( 1 )  );

	  $('#slider-range-lefthook').slider( "option", "max",  len_round );
      $('#slider-range-lefthook').slider( "option", "value",  1 );
      $( "#lefthook" ).val(  convert_to_min_sec( 1 )  );

	  $('#slider-range-righthook').slider( "option", "max",  len_round );
      $('#slider-range-righthook').slider( "option", "value",  1 );
      $( "#righthook" ).val(  convert_to_min_sec( 1 )  );

	  $('#slider-range-leftuppercut').slider( "option", "max",  len_round );
      $('#slider-range-leftuppercut').slider( "option", "value",  1 );
      $( "#leftuppercut" ).val(  convert_to_min_sec( 1 )  );

	  $('#slider-range-rightuppercut').slider( "option", "max",  len_round );
      $('#slider-range-rightuppercut').slider( "option", "value",  1 );
      $( "#rightuppercut" ).val(  convert_to_min_sec( 1 )  );

	  $('#slider-range-overhandpunch').slider( "option", "max",  len_round );
      $('#slider-range-overhandpunch').slider( "option", "value",  1 );
      $( "#overhandpunch" ).val(  convert_to_min_sec( 1 )  );


      $('#slider-range-sequence').slider( "option", "max",  len_round );
      $('#slider-range-sequence').slider( "option", "value",  1 );
      $( "#seq_input" ).val(  convert_to_min_sec( 1 )  );

    }
  });

  len_round = 60;
  $( "#amount" ).val(   "01:00" );


  // rest
  $( "#slider-range-min-rest" ).slider({

    range: "min",
    value: 30,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#rest" ).val(  convert_to_min_sec( ui.value)  );
      len_rest = ui.value; // ilosc sek - rest

    }
  });

  len_rest = 30;
  $( "#rest" ).val(  "00:30" );

//punches


  // jab ------------------------------------
  $( "#slider-range-jab" ).slider({

    range: "min",
    value: 10,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#jab" ).val(  convert_to_min_sec( ui.value)  );


    }
  });
  $( "#jab" ).val(  "00:10" );
  $( "#add_jab_button" ).click(function(){

     var get_jab_time =  $( "#slider-range-jab" ).slider("value");
     addPunch(walk, "jab", get_jab_time);
    // alert(get_jab_time);

   });



  $( "#jab_button" ).click(function(){

        audio = new Audio("dzwieki/jab.mp3");
     	audio.play();
   });



  // cross ---------------------------------------
  $( "#slider-range-cross" ).slider({

    range: "min",
    value: 20,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#cross" ).val(  convert_to_min_sec( ui.value)  );


    }
  });

  $( "#cross" ).val(  "00:20" );
  $( "#add_cross_button" ).click(function(){

        var get_jab_time =  $( "#slider-range-cross" ).slider("value");
        addPunch(walk, "cross", get_jab_time);
      //  alert(get_jab_time);

   });
   $( "#cross_button" ).click(function(){

     	audio = new Audio("dzwieki/cross.mp3");
     	audio.play();
   });

  //lefthook

	$( "#slider-range-lefthook" ).slider({

    range: "min",
    value: 10,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#lefthook" ).val(  convert_to_min_sec( ui.value)  );


    }
  });
  $( "#lefthook" ).val(  "00:10" );
  $( "#add_lefthook_button" ).click(function(){

     var get_jab_time =  $( "#slider-range-lefthook" ).slider("value");
     addPunch(walk, "lefthook", get_jab_time);
    // alert(get_jab_time);

   });



  $( "#lefthook_button" ).click(function(){

        audio = new Audio("dzwieki/lefthook.mp3");
     	audio.play();
   });


 // righthook

	$( "#slider-range-righthook" ).slider({

    range: "min",
    value: 10,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#righthook" ).val(  convert_to_min_sec( ui.value)  );


    }
  });
  $( "#righthook" ).val(  "00:10" );
  $( "#add_righthook_button" ).click(function(){

     var get_jab_time =  $( "#slider-range-righthook" ).slider("value");
     addPunch(walk, "righthook", get_jab_time);
    // alert(get_jab_time);

   });



  $( "#righthook_button" ).click(function(){

        audio = new Audio("dzwieki/righthook.mp3");
     	audio.play();
   });

  // left-uppercut

	 $( "#slider-range-leftuppercut" ).slider({

    range: "min",
    value: 10,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#leftuppercut" ).val(  convert_to_min_sec( ui.value)  );


    }
  });
  $( "#leftuppercut" ).val(  "00:10" );
  $( "#add_leftuppercut_button" ).click(function(){

     var get_jab_time =  $( "#slider-range-leftuppercut" ).slider("value");
     addPunch(walk, "leftuppercut", get_jab_time);
    // alert(get_jab_time);

   });



  $( "#leftuppercut_button" ).click(function(){

        audio = new Audio("dzwieki/leftuppercut.mp3");
     	audio.play();
   });

	// right-uppercut

  $( "#slider-range-rightuppercut" ).slider({

    range: "min",
    value: 10,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#rightuppercut" ).val(  convert_to_min_sec( ui.value)  );


    }
  });
  $( "#rightuppercut" ).val(  "00:10" );
  $( "#add_rightuppercut_button" ).click(function(){

     var get_jab_time =  $( "#slider-range-rightuppercut" ).slider("value");
     addPunch(walk, "rightuppercut", get_jab_time);
    // alert(get_jab_time);

   });



  $( "#rightuppercut_button" ).click(function(){

        audio = new Audio("dzwieki/rightuppercut.mp3");
     	audio.play();
   });

	// overhandpunch

  $( "#slider-range-overhandpunch" ).slider({

    range: "min",
    value: 10,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#overhandpunch" ).val(  convert_to_min_sec( ui.value)  );


    }
  });
  $( "#overhandpunch" ).val(  "00:10" );
  $( "#add_overhandpunch_button" ).click(function(){

     var get_jab_time =  $( "#slider-range-overhandpunch" ).slider("value");
     addPunch(walk, "overhandpunch", get_jab_time);
    // alert(get_jab_time);

   });



  $( "#overhandpunch_button" ).click(function(){

        audio = new Audio("dzwieki/overhandpunch.mp3");
     	audio.play();
   });


  // sekwencje ---------------------------------------
  $( "#slider-range-sequence" ).slider({

    range: "min",
    value: 20,
    min: 1,
    max: 1000,
    slide: function( event, ui ) {

      $( "#seq_input" ).val(  convert_to_min_sec( ui.value)  );


    }
  });


   $( "#seq_input" ).val(  "00:20" );

   $( "#seq_button" ).click(function(){

     	 var str = $( "#secv" ).val();
         play_all_sounds(str);
   });


    $( "#add_secv" ).click(function(){

        var str = $( "#secv" ).val();
        if (str.length>0) {

            var get_jab_time =  $( "#slider-range-sequence" ).slider("value");
            addPunch(walk, str, get_jab_time);

        }

   });

});


function play_all_sounds(str)
{

         var res = str.split("-");
         if (res.length>1) {

             tablica = new Array();
             for(i=0;i<res.length; i++)
             {
                sound = get_sound( res[i] );
                if (sound != null) {
                    tablica.push(sound);
                }
             }
             kolejka(tablica); // kolejka ciosow

         } else {

            play_sound(str); // pojedynczy cios

         }
}


function clear_secv()
{
    $( "#secv" ).val("");
}


function mplay(audio, callback) {

    try {

      audio.play();

    if(callback)
    {
      audio.onended = callback;
    }

    } catch(e){ }

}

function kolejka(sounds){

  var index = 0;

  function recursive_play()
  {
    if(index+1 === sounds.length)
    {
      mplay(sounds[index],null);
    }
    else
    {
      mplay(sounds[index],function(){index++; recursive_play();});
    }
  }

  recursive_play();
}


function punch(p) {

    var tmp =  $( "#secv" ).val();

    if(tmp=="")
        tmp += p;
    else
        tmp +="-" + p;

    $( "#secv" ).val(tmp);

}
