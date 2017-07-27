$(document).ready(function() {
  $(".pause").hide();
  var sound = $("#sound")[0];

  // now Session or Break timer?
  var isNowSession = true;

  // css depended what is timer now
  function cssSessOrBreak() {
    if(isNowSession) {
      $("#lbS").css("background-color", "#f77");
      $("#lbS").css("color", "black");
      $("#lbBr").css("background-color", "#822");
      $("#lbBr").css("color", "#ffe6e6");
    }
    else {
      $("#lbBr").css("background-color", "#f77");
      $("#lbBr").css("color", "black");
      $("#lbS").css("background-color", "#822");
      $("#lbS").css("color", "#ffe6e6");
    }
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
    if(minut < 10) minut = '0' + minut; 
    $('#lcd').val(minut + ':00')
  }

  // 
  $('.start').click(function () {
    cssSessOrBreak();
    $(".start").hide();
    $(".pause").show();
  })



});
