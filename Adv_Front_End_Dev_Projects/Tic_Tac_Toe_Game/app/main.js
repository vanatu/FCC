$(document).ready(function() {
  var mySign,
    alienName,
    alienSign,
    colorSign,
    curSign,
    myScore = 0,
    alienScore = 0,
    cnt = 0;
  startScreen();

  function startScreen() {
    $("#player1").css("color", "white");
    $("#player2").css("color", "#4c4");
    $("#menu").show();
    $("#cont").hide();
    $(".gameMode").show();
    $("#board").hide();
    $("#newGame").hide();
    $(".xo").hide();
    (myScore = 0), (alienScore = 0);
    $(".gameMode").click(function() {
      $(".gameMode").hide();
      $(".xo").show();
      if ($(this).val() == "Computer") alienName = "Computer";
      else alienName = "Player 2";
    });
    $(".xo").click(function() {
      if ($(this).val() == "X") {
        mySign = "X";
        alienSign = "O";
      } else {
        mySign = "O";
        alienSign = "X";
      }
      $("#menu").hide();
      tablo();
      startGame(mySign);
    });
  }

  function startGame(sign) {
    curSign = sign;
    cnt = 0;
    $("#board").show();
    $("#newGame").show();
    $("#newGame").val("New Game");
    $(".cell").css("color", "#ddd");
    $(".cell").prop("disabled", false);
    $("#a1").val(1);
    $("#a2").val(2);
    $("#a3").val(3);
    $("#b1").val(4);
    $("#b2").val(5);
    $("#b3").val(6);
    $("#c1").val(7);
    $("#c2").val(8);
    $("#c3").val(9);
    $(".cell").css("background-color", "#ddd");
  }

  $(".cell").click(function() {
    cnt += 1;
    $(this).css("color", "#000");
    $(this).prop("disabled", true);
    colorSign = "#0033cc";
    if (curSign == "X") colorSign = "#cc0000";
    $(this).val(curSign);
    $(this).css("color", colorSign);
    if (alienName == "Computer") {
      compTurn();
    } else {
      if (curSign == mySign) {
        curSign = alienSign;
        $("#player2").css("color", "white");
        $("#player1").css("color", "#4c4");
      } else {
        curSign = mySign;
        $("#player2").css("color", "#4c4");
        $("#player1").css("color", "white");
      }
    }
    if (win()) winCSS(win());
    else if (cnt == 9) {
      myScore += 1;
      alienScore += 1;
      endGame();
    }
  });

  function compTurn() {
    colorSign = "#0033cc";
    var item,
    itemsCorner = ['a1', 'a3', 'c1', 'c3'].filter(function(x){return $('#'+x).prop('disabled') == false}),
    itemsOther = ['a2','b1','b3','c2'].filter(function(x){return $('#'+x).prop('disabled') == false});
    if (alienSign == "X") colorSign = "#cc0000";
    if ($("#b2").prop("disabled") == false) {
      item = 'b2';
    }
    else if(itemsCorner.length > 0) item = itemsCorner[Math.floor(Math.random()*itemsCorner.length)]; 
    else item = itemsOther[Math.floor(Math.random()*itemsOther.length)]; 
    $('#'+item).val(alienSign);
    $('#'+item).css("color", colorSign);
    $('#'+item).prop('disabled','true');
    }

  function tablo() {
    function difWidth(x, y) {
      var px1 = $(x).css("width");
      var px2 = $(y).css("width");
      var width1 = px1.slice(0, px1.length - 2);
      var width2 = px2.slice(0, px2.length - 2);
      if (width2 - width1 > 0) return width2 - width1;
      else return 0;
    }
    $("#player1").html("Player 1 (" + mySign + ") ");
    $("#player2").html(" (" + alienSign + ") " + alienName);
    $("#result").html(myScore + " : " + alienScore);
    $("#tablo").css("padding-left", difWidth($("#player1"), $("#player2")));
  }

  function win() {
    function whoWin([x, y, z]) {
      var x1 = $("#" + x).val();
      var y1 = $("#" + y).val();
      var z1 = $("#" + z).val();
      var isWin = false;
      if (x1 == "X" && x1 == y1 && y1 == z1) isWin = ["X", x, y, z];
      else if (x1 == "O" && x1 == y1 && y1 == z1) isWin = ["O", x, y, z];
      return isWin;
    }
    var arr = [
      ["a1", "a2", "a3"],
      ["b1", "b2", "b3"],
      ["c1", "c2", "c3"],
      ["a1", "b1", "c1"],
      ["a2", "b2", "c2"],
      ["a3", "b3", "c3"],
      ["a1", "b2", "c3"],
      ["a3", "b2", "c1"]
    ];
    for (var i = 0; i < 8; i++) {
      if (whoWin(arr[i])) {
        return whoWin(arr[i]);
      }
    }
  }
  function winCSS([sign, x, y, z]) {
    $("#" + x).css("background-color", "#ffff99");
    $("#" + y).css("background-color", "#ffff99");
    $("#" + z).css("background-color", "#ffff99");
    $(".cell").prop("disabled", true);
    if (mySign == sign) myScore += 1;
    else alienScore += 1;
    endGame();
  }

  function endGame() {
    $("#result").html(myScore + " : " + alienScore);
    if (myScore < 3 && alienScore < 3) {
      $("#newGame").hide();
      $("#cont").show();
    }
  }

  $("#newGame").click(function() {
    startScreen();
  });

  $("#cont").click(function() {
    $("#newGame").show();
    $("#cont").hide();
    if (curSign == mySign) startGame(mySign);
    else startGame(alienSign);
  });
});
