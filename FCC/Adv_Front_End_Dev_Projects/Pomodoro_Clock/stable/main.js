$(document).ready(function() {
  $(".pause").hide();
  var sound = $("#sound")[0];
  var br = parseInt($("#break").html());
  var ses = parseInt($("#sess").html());
  var sec, count, brCount;

  function timeInLcd(min, sec) {
    if (sec < 10 && sec !== "00") sec = "0" + sec;
    if (min < 10) min = "0" + min;
    $("#lcd").val(min + ":" + sec);
  }

  function checkReset() {
    $("#break").html(br);
    $("#sess").html(ses);
    if ($(".start").is(":visible")) timeInLcd(ses, "00");
  }

  function propTimer(x) {
    if ($("#lbS").css("color") != "rgb(0, 0, 0)") {
      sec = 59;
      ses = parseInt($("#sess").html());
      br = parseInt($("#break").html());
    }
    if (x == 1) {
      timeInLcd(ses - 1, sec);
      $("#minS, #plusS, #defS").prop("disabled", true);
      $("#minBr, #plusBr, #defBr").prop("disabled", false);
      $("#lbS").css("background-color", "#f77");
      $("#lbS").css("color", "black");
      $("#lbBr").css("background-color", "#822");
      $("#lbBr").css("color", "#ffe6e6");
    } else {
      timeInLcd(br - 1, sec);
      $("#minS, #plusS, #defS").prop("disabled", false);
      $("#minBr, #plusBr, #defBr").prop("disabled", true);
      $("#lbS").css("background-color", "#822");
      $("#lbS").css("color", "#ffe6e6");
      $("#lbBr").css("background-color", "#f77");
      $("#lbBr").css("color", "black");
    }
  }

  $(".pause").click(function() {
    $(".pause").hide();
    $(".start").show();
    clearInterval(count);
    clearInterval(brCount);
    $("#minS, #plusS, #defS").prop("disabled", false);
    $("#minBr, #plusBr, #defBr").prop("disabled", false);
  });

  $(".start").click(function pushStart() {
    $(".start").hide();
    $(".pause").show();
    propTimer(1);
    count = setInterval(function() {
      if ($("#lcd").val() === "00:00") {
        clearInterval(count);
        sound.play();
        propTimer(2);
        brCount = setInterval(function() {
          if ($("#lcd").val() === "00:00") {
            clearInterval(brCount);
            sound.play();
            pushStart();
          } else {
            timeInLcd(br - 1, sec);
            sec -= 1;
            if (sec == -1) {
              sec = 59;
              br -= 1;
            }
          }
        }, 1000);
      } else {
        timeInLcd(ses - 1, sec);
        sec -= 1;
        if (sec == -1) {
          sec = 59;
          ses -= 1;
        }
      }
    }, 1000);
  });

  $("#minBr").click(function() {
    if (br != 1) {
      br -= 1;
      checkReset();
    }
  });

  $("#plusBr").click(function() {
    if (br < 60) {
      br += 1;
      checkReset();
    }
  });

  $("#minS").click(function() {
    if (ses != 1) {
      ses -= 1;
      checkReset();
    }
  });

  $("#plusS").click(function() {
    if (ses < 60) {
      ses += 1;
      checkReset();
    }
  });

  $("#defBr").click(function() {
    br = 5;
    checkReset();
  });

  $("#defS").click(function() {
    ses = 25;
    checkReset();
  });
});
