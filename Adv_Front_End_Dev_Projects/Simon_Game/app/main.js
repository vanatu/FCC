'use strict';
var str = false,
cnt = 0,
seqColors = [],
sounds = [$("#soundRed"), $("#soundBlue"), $("#soundYellow"), $("#soundGreen")],
colorBtn = ["red", "blue", "yellow", "green"];

function strictOn(str) {
  var color = '#000', shadow = 'none';
  if(str) {
    color ='yellow';
    shadow = '2px 2px 5px green';
  }
  $('#lbStr').css('color',color);
  $('#lbStr').css('text-shadow', shadow); 
}

function playSound (num) {
    var color = colorBtn[num];
    $(`#${color}`).removeClass(`${color}_on`);
    $(`#${color}`).addClass(`${color}_beep`);
    setTimeout(function(){
      $(`#${color}`).removeClass(`${color}_beep`);
      $(`#${color}`).addClass(`${color}_on`);
    }, 500)
    sounds[num][0].play();
}

function colorOnOff(on){
  for(var i=0; i<colorBtn.length; i++){
    var color = colorBtn[i];
    if(on) {
      $(`#${color}`).removeClass(`${color}_off`);
      $(`#${color}`).addClass(`${color}_on`);
    } else {
      $(`#${color}`).removeClass(`${color}_on`);
      $(`#${color}`).addClass(`${color}_off`);
    }
  }
}

function startGame() {
  seqColors = [];
  var userClick = 0, prevUserClick = 0;  
  for(let i=0; i<20; i++){
    seqColors.push(Math.floor(Math.random() * 4));
  };
  $('.button').css('cursor', 'pointer');
 
  var turn = function(userClick){
    prevUserClick = userClick;
    playSound(seqColors[userClick]);
    $('.button').on('click', function(){
      playSound(colorBtn.indexOf(this.id));
      userClick += 1;
      if(userClick - prevUserClick === 1) {
        setTimeout(function(){
          turn(userClick);
        }, 1000)
      }
    });
  }
  turn(userClick);
}

function endGame() {
  $('.button').unbind('click');
  $('.button').css('cursor', 'default');
}

$(document).ready(function() {
  $(".onoff").on("click", function(){
    if($(this).val() == "off"){
      $(this).val("on");
      $(this).attr("id","on");
      $('.btn').prop("disabled",false);
      $('#count').val('__');
      colorOnOff(true);
    }
    else {
      $(this).val("off");
      $(this).attr("id","off");
      $('.btn').prop("disabled",true);
      $('#count').val('');
      colorOnOff(false);
      $('#lbStr').css('color','#000');
      $('#lbStr').css('text-shadow','none');
      str = false;
      endGame();
    }
  })
  $("#strict").on("click", function(){
    str = !str;
    strictOn(str);
  })
  $('#start').on('click', function(){
    startGame();
  })
});
