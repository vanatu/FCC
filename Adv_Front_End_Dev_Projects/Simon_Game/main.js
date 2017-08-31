'use strict';
var str = false,
on = false,
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
  on = true;
  seqColors = [];
  var userClick = 0, prevUserClick = 0;  
  for(let i=0; i<20; i++){
    seqColors.push(Math.floor(Math.random() * 4));
  };

  var turn = 1;
  var comp = true;

  function tablo(cnt){
    if(cnt < 10) cnt = "0" + cnt;
    $('#count').val(cnt);
  }

  function beepSeq(num){
    $('.button').unbind( "click" );
    for(var i=0; i<num; i++){
      setTimeout(function(i){
        if(on) {
          playSound(seqColors[i]);
        }
      }.bind(this, i), 1000 * i);
    }
    setTimeout(function(){
      comp = false;
      game(comp, num);
    }, 1000 * turn)
  };
  function userTurn(num){
    var cl = 0;
    $('.button').css('cursor', 'pointer');
    $('.button').on('click', function(){
      playSound(colorBtn.indexOf(this.id));
      if(colorBtn[seqColors[cl]] != this.id){
        if(str) return endGame();
        else {
           return game(true, turn);
        }
      } 
      cl++;
      --num;
      if(num == 0) {
        tablo(++cnt);
        $('.button').unbind( "click" );
        $('.button').css('cursor', 'default');
        setTimeout(function(){
          comp = true;
          game(comp, ++turn);
        }, 1000 )
      };
    })
  };

  game(comp, turn);

  function game(comp, turn){
    if(cnt!='20'){
      if(comp){
      beepSeq(turn);
      } else userTurn(turn);
    }
  }

}

function endGame() {
  cnt = 0;
  $('.button').unbind('click');
  $('.button').css('cursor', 'default');
  $('#count').val('__');
  on = false;
}

$(document).ready(function() {
  $(".onoff").on("click", function(){
    if($(this).val() == "off"){
      $(this).val("on");
      $(this).attr("id","on");
      $('.btn').prop("disabled",false);
      $('#count').val('__');
      colorOnOff(true);
      on = true;
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
      on = false;
      endGame();
    }
  })
  $("#strict").on("click", function(){
    str = !str;
    strictOn(str);
  })
  $('#start').on('click', function(){
    endGame();
    setTimeout(function(){
      startGame();
    }, 1000 )
  })
});
