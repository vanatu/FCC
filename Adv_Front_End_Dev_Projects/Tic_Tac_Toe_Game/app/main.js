$(document).ready(function() {
  var mySign,
    alienName,
    alienSign,
    colorSign,
    curSign,
    myTurn = true,
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
    (myScore = 0), (alienScore = 0), (myTurn = true);
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
      startGame();
    });
  }

  function whoTurn(x) {
    if(alienName == 'Computer') curSign = mySign;
    else {
      var y;
      x === mySign ? y = 1 : y = 2;
      curSign = x;
      $("#player" + y).css("color", "white");
      $("#player" + (3-y)).css("color", "#4c4");
   }
  }

  function startGame() {
    myTurn ? whoTurn(mySign) : whoTurn(alienSign);
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
    if(alienName == "Computer" && !myTurn) compTurn();
  }

  $(".cell").click(function() {
    cnt += 1;
    $(this).prop("disabled", true);
    colorSign = "#0033cc";
    if (curSign == "X") colorSign = "#cc0000";
    $(this).val(curSign);
    $(this).css("color", colorSign);
    if (win()) winCSS(win());
    else if (cnt == 9) {
      myScore += 1;
      alienScore += 1;
      endGame();
    } else { 
      if(alienName == "Computer") compTurn();
      else curSign == mySign ? whoTurn(alienSign) : whoTurn(mySign);
    }
  });

  function compTurn() {
    var arr = [];
    function winNow(arr) {

      function letter(eth, arr){
        for(var i=0; i<arr.length; i++) {
          eth = eth.filter(function(x) { return x != arr[i] })
        }
        return eth[0];
      }

      var a = arr.filter(function(x){ return x.indexOf('a') >= 0 }).map(function(x){return x[1]});
      var b = arr.filter(function(x){ return x.indexOf('b') >= 0 }).map(function(x){return x[1]});
      var c = arr.filter(function(x){ return x.indexOf('c') >= 0 }).map(function(x){return x[1]});
      var one = arr.filter(function(x){ return x.indexOf('1') >= 0 }).map(function(x){return x[0]});
      var two = arr.filter(function(x){ return x.indexOf('2') >= 0 }).map(function(x){return x[0]});
      var thr = arr.filter(function(x){ return x.indexOf('3') >= 0 }).map(function(x){return x[0]});
      var diag1 = arr.filter(function(x){ if(x == 'a1' || x == 'b2' || x == 'c3') return x });
      var diag2 = arr.filter(function(x){ if(x == 'c1' || x == 'b2' || x == 'a3') return x });
      if(diag1.length == 2) arr.push(letter(['a1', 'b2', 'c3'], diag1));
      if(diag2.length == 2) arr.push(letter(['a3', 'b2', 'c1'], diag2));
      if(a.length == 2) arr.push('a'+(6 - a.reduce((prev, curr) => prev*1 + curr*1 )));
      if(b.length == 2) arr.push('b'+(6 - b.reduce((prev, curr) => prev*1 + curr*1 )));
      if(c.length == 2) arr.push('c'+(6 - c.reduce((prev, curr) => prev*1 + curr*1 )));
      if(one.length == 2) arr.push(letter(['a', 'b', 'c'], one) + '1');
      if(two.length == 2) arr.push(letter(['a', 'b', 'c'], two) + '2');
      if(thr.length == 2) arr.push(letter(['a', 'b', 'c'], thr) + '3');
      for(var i=0; i < arr.length; i++) {
        if($('#'+arr[i]).prop("disabled") == false) return arr[i];
      }
    }  

    colorSign = "#0033cc";
    var item,
    allCell = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'],
    itemsCorner = ['a1', 'a3', 'c1', 'c3'].filter(function(x){return $('#'+x).prop('disabled') == false}),
    itemsOther = ['a2','b1','b3','c2'].filter(function(x){return $('#'+x).prop('disabled') == false}),
    playerSigns = allCell.filter(function (x) { return $('#'+x).val() == mySign }),
    compSigns = allCell.filter(function (x) { return $('#'+x).val() == alienSign });

    if (alienSign == "X") colorSign = "#cc0000";
    if(winNow(compSigns)) item = winNow(compSigns);
    else if(winNow(playerSigns)) item = winNow(playerSigns);
    else if ($("#b2").prop("disabled") == false) item = 'b2';
    else if(itemsCorner.length > 0) item = itemsCorner[Math.floor(Math.random()*itemsCorner.length)]; 
    else item = itemsOther[Math.floor(Math.random()*itemsOther.length)]; 
    $('#'+item).val(alienSign);
    $('#'+item).css("color", colorSign);
    $('#'+item).prop('disabled','true');
    cnt += 1;
    if (win()) winCSS(win());
    else if (cnt == 9) {
      myScore += 1;
      alienScore += 1;
      endGame();
    }
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
    myTurn = !myTurn;
    $("#result").html(myScore + " : " + alienScore);
    console.log('end game. ' + myScore + ' : ' + alienScore);
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
    startGame();
  });
});
