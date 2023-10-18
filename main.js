/**/
'use strict'
$(document).ready(function() {
  let setTimeoutId = undefined;
  let startTime = 0;
  let currentTime = 0;
  let elapsedTime = 0;

  
  function runTimer(){
    currentTime = Date.now();
    showTime();
    setTimeoutId = setTimeout(() => {
      runTimer();
    },100)
  }
  
/*----------------タイマーの表記---------------*/
  function showTime(){
    let d = new Date(currentTime - startTime + elapsedTime);
    //時：分：秒：ミリ秒の定義
    const getHour = d.getHours()-9;
    const getMin = d.getMinutes();
    const getSec =d.getSeconds();
    const getMillisec = Math.floor(d.getMilliseconds() / 100);
    //タイマーの表示形式と配置
    $("#timer").text(`${String(getHour).padStart(1,'0')}:${String(getMin).padStart(1,'0')}:${String(getSec).padStart(1,'0')}:${String(getMillisec).padStart(1,'0')}`);
  }

/*------------------ボタンの制御---------------------*/
//スタート押下した後の制御＝スタートとリセットを非活性、ストップを活性
  function classReplacementRun()  {
    $("#start").addClass("disabled");
    $("#stop").removeClass("disabled");
    $("#reset").addClass("disabled");
  }
//ストップ押下した後の制御＝スタートとリセットを活性、ストップを非活性
  function classReplacementStop()  {
    $("#start").removeClass("disabled");
    $("#stop").addClass("disabled");
    $("#reset").removeClass("disabled");
  }
//初期値に戻す（リセット押した後＝スタートを活性
  function classReplacementInitial()  {
    $("#start").removeClass("disabled");
    $("#stop").addClass("disabled");
    $("#reset").addClass("disabled");
  }


  $("#start").click(function() {
    if($(this).hasClass('disabled')){
      return;
    }
    classReplacementRun()
    startTime = Date.now();
    runTimer();
  });

  $("#stop").click(function() {
    if($(this).hasClass('disabled')){
      return;
    }
    classReplacementStop()
    elapsedTime += currentTime - startTime;
    clearTimeout(setTimeoutId);
  });

  $("#reset").click(function() {
    if($(this).hasClass('disabled')){
      return;
    }
    classReplacementInitial()
    clearTimeout(setTimeoutId);
    elapsedTime = 0
    $("#timer").text("0:0:0:0");
  });
  
  


});


