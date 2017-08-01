$(document).ready(function() {
  $(".pause").hide();
  //var sound = $("#sound")[0];

  // now Session or Break timer?
  var isNowSession = true;

  // css depended what is timer now
  function cssSessOrBreak() {
    $("#minS, #plusS, #defS").prop("disabled", false);
    $("#minBr, #plusBr, #defBr").prop("disabled", false);
    if(isNowSession) {
      if ($(".pause").is(":visible")) {
        $("#minS, #plusS, #defS").prop("disabled", true);
      }
      else {
        $("#minS, #plusS, #defS").prop("disabled", false);
      }
      $("#lbS").css("background-color", "#f77");
      $("#lbS").css("color", "black");
      $("#lbBr").css("background-color", "#822");
      $("#lbBr").css("color", "#ffe6e6");
    }
    else {
      if ($(".pause").is(":visible")) {
        $("#minBr, #plusBr, #defBr").prop("disabled", true);
      }
      else {
        $("#minBr, #plusBr, #defBr").prop("disabled", false);
       }
      $("#lbBr").css("background-color", "#f77");
      $("#lbBr").css("color", "black");
      $("#lbS").css("background-color", "#822");
      $("#lbS").css("color", "#ffe6e6");
    }
  }

  // add '0' before digit < 10
  function addZero(x) {
    if(x < 10 && x[0] !== '0') return '0' + x;
    else return x
  }

  // click buttons for session
  var sesTimer = parseInt($("#sess").html());
  $("#minS").click(function() {
    if(sesTimer > 1) {
      $("#sess").html(sesTimer -= 1);
      if(isNowSession) setScreenTime(sesTimer)
    }
  })

  $("#plusS").click(function() {
    if(sesTimer < 60) {
      $("#sess").html(sesTimer += 1);
      if(isNowSession) setScreenTime(sesTimer)
    }
  })

  $("#defS").click(function() {
    $("#sess").html("25");
    sesTimer = parseInt($("#sess").html());
    if(isNowSession) setScreenTime(sesTimer)
  })
  
  // click buttons for break
  var breakTimer = parseInt($("#break").html());
  $("#minBr").click(function() {
    if(breakTimer > 1) {
      $("#break").html(breakTimer -= 1);
      if(!isNowSession) setScreenTime(breakTimer)
    }
  })

  $("#plusBr").click(function() {
    if(breakTimer < 60) {
      $("#break").html(breakTimer += 1);
      if(!isNowSession) setScreenTime(breakTimer)
    }
  })

  $("#defBr").click(function() {
    $("#break").html("5");
    breakTimer = parseInt($("#break").html());
    if(!isNowSession) setScreenTime(breakTimer)
  })
  
  // change time on screen by press buttons
  function setScreenTime(minut) {
    $('#lcd').val(addZero(minut) + ':00')
  }

  // decrement time in screen
  function ticTime() {
    var minutes = $('#lcd').val().split(':')[0];
    var secundes = $('#lcd').val().split(':')[1];
    if(secundes == '00') {
      minutes -= 1;
      secundes = 60;
    } 
    secundes -= 1;
    $('#lcd').val(addZero(minutes) + ':' + addZero(secundes))
  }
var goTimer;
  function startTimer() {
    cssSessOrBreak();
    goTimer = setInterval(function() {
      if ($("#lcd").val() === "00:00") {
        clearInterval(goTimer);
        $('#sound').get(0).play();
        isNowSession = !isNowSession;
        if(isNowSession) setScreenTime(sesTimer);
        else setScreenTime(breakTimer);
        startTimer();
      } else {
        ticTime();
      }
    }, 1000)
  }

  // click start button
  $('.start').click(function () {
    $(".start").hide();
    $(".pause").show();
    startTimer();
  })

  // click pause button
  $('.pause').click(function () {
    $(".start").show();
    $(".pause").hide();
    cssSessOrBreak();
    clearInterval(goTimer);
  })


});
