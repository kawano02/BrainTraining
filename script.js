$(function() {

// サウンドの設定
  let correctSound = new Audio('sound/correctSound.mp3');
  correctSound.playbackRate = 1.5;

  let missSound = new Audio('sound/missSound.mp3');
  missSound.playbackRate = 2;

// 総合力を押した時クリア後に次の問題に進む
function nextStage(url, gameScore) {
  location.href = url + ".html?name=comprehensive&value=" + gameScore;
}

function resultStage(gameScore) {
  location.href = "result.html?value=" + gameScore;
}

  $("#category0").on("click",function() {
    // nextStage("observe");
    location.href = "observe.html?name=comprehensive";
  });

  $("#category1").on("click",function() {
    location.href = 'observe.html';
  });

  $("#category2").on("click",function() {
    location.href = 'memory.html';
  });

  $("#category3").on("click",function() {
    location.href = 'judgement.html';
  });

  $("#category4").on("click",function() {
    location.href = 'intuition.html';
  });

  $("#category5").on("click",function() {
    location.href = 'calculation.html';
  });

  $("#category6").on("click",function() {
    location.href = 'response.html';
  })

  let url;
  let parameters;
  let observeScore;
  let memoryScore;
  let judgementScore;
  let intuitionScore;
  let calculationScore;
  let responseScore;


// 直感力ここから

  // ランダムで秒数を決める
  let intuitionRandNum;
  let intuitionProblemNum;

  function intuitionRand() {
    intuitionRandNum = Math.floor(Math.random() * 10);
    intuitionProblemNum = (5 + intuitionRandNum / 2).toFixed(1);
    $(".intuition-problem-num").text(intuitionProblemNum);
  }
  
  intuitionRand();

  // 共通ストップウォッチ
  let timerCount = 0;
  function countUp() {
    timerCount += 0.01;
    $(".timer").text((Math.round(timerCount * 100)) / 100);
  }
  countUpId = setInterval(countUp, 10);

  // 直感力ストップウォッチ
  let intuitionTimerStartStop = 0;
  let timerCount2 = 0

  function countUp2() {
    timerCount2 += 0.01;
    $(".intuition-timer").text((Math.round(timerCount2 * 100)) / 100);
    $(".intuition-timer").fadeOut(intuitionProblemNum * 375); //８分の３の時間でフェードアウト
  }

  let intuitionCount = 0;
  let intuitionDifference = 0;

  $(".intuition-timer-wrap").on("click",function() {

    if(intuitionTimerStartStop == 0) {
      intervalId = setInterval(countUp2,10);
      intuitionTimerStartStop = 1;
    } else {
      intuitionCount++;

      if(intuitionProblemNum >= timerCount2) {
        intuitionDifference += intuitionProblemNum - timerCount2;
      } else {
        intuitionDifference += timerCount2 - intuitionProblemNum;
      }

      if(intuitionCount == 5) {
        clearInterval(intervalId);
        $(".intuition-timer").stop(true, true);
        $(".intuition-timer-sub").text(timerCount2.toFixed(2) + " / " + intuitionProblemNum);
        $(".intuition-timer").show();
        $(".intuition-count").text(intuitionCount + "/5");
        $(".clear").show();


        if(intuitionDifference < 2) {
          intuitionScore = "5";
        } else if(intuitionDifference < 3) {
          intuitionScore = "4";
        } else if(intuitionDifference < 4) {
          intuitionScore = "3";
        } else if(intuitionDifference < 5) {
          intuitionScore = "2";
        } else {
          intuitionScore = "1";
        }

        url = location.href;
        parameters = url.split(/&|=/);

        if(parameters[1] == "comprehensive") {
          totalScore = parameters[3] + intuitionScore;
          setTimeout(function() {
            nextStage("calculation", totalScore);
          }, 3000);
        } else {
          totalScore = "i" + intuitionScore;
          setTimeout(function() { 
            resultStage(totalScore);
          }, 3000);
        }

      } else if(intuitionCount < 5){
        $(".intuition-timer-sub").text(timerCount2.toFixed(2) + " / " + intuitionProblemNum);
        intuitionRand();
        clearInterval(intervalId);
        $(".intuition-timer").stop(true, true);
        timerCount2 = 0;
        $(".intuition-timer").show();
        intervalId = setInterval(countUp2,10);
        $(".intuition-count").text(intuitionCount + "/5");
      }
    }
  })

// 直感力ここまで

  
  let setNum = 25;

  function rand(num) {
    return Math.floor(Math.random() * num);
  }

  let numArray = [];
  for(let i=0; i < 25; i++) {
    numArray.push(i + 1);
  }


  for(let j=1; j<=25; j++) {
    let selectedNum = rand(setNum);
    $("#panel" + j).text(numArray[selectedNum]);
    numArray.splice(selectedNum, 1);
    setNum -= 1;
  }
  


  let answer = 1;

  $(".panelNum").on("click",function() {
    if($(this).text() == answer) {

      if(answer == 25) {
        // クリアした時
        $(".clear").show();
        clearInterval(countUpId);

        if(timerCount < 15) {
          observeScore = "5";
        } else if(timerCount < 20) {
          observeScore = "4";
        } else if(timerCount < 25) {
          observeScore = "3";
        } else if(timerCount < 30) {
          observeScore = "2";
        } else {
          observeScore = "1";
        }

        url = location.href;
        parameters = url.split("=");

        if(parameters[1] == "comprehensive") {
          setTimeout(function() {
            totalScore = observeScore;
            nextStage("memory", totalScore);
           }, 3000);
        } else {
          setTimeout(function() {
            // iは直感力のマーク
            totalScore = "o" + observeScore;
            resultStage(totalScore);
           }, 3000);
        }
      }
      $(".observe-count").text(answer + "/25");
      correctSound.pause();
      correctSound.currentTime = 0.2;  
      correctSound.play();
      answer += 1;
    } else {
      //ミスした時
      missSound.pause();
      missSound.currentTime = 0;
      missSound.play();
    }
  })

  // ここから記憶力

  let memoryNumArray = [];

  for(let i=1; i<=20; i++) {
    if(i % 2 == 0) {
      memoryNumArray.push(i / 2 - 1);
    } else {
      memoryNumArray.push((i + 1) / 2 - 1);
    }
  }

  let memoryNum = 20;

  for(let j=1; j<=20; j++) {
    let memorySelectedNum = rand(memoryNum);
    $("#memoryBody" + j).text(memoryNumArray[memorySelectedNum]);
    memoryNumArray.splice(memorySelectedNum, 1);
    memoryNum -= 1;
  }

  let memoryCount = 0;
  let correctCount = 0;
  let correct = 0;
  let memoryBodyText1 = "";
  let memoryBodyText2 = "";
  let memoryPanelKey = "";
  let memoryPanelKey1 = "";
  let memoryPanelKey2 = "";


    $(".memory-panel").on("click",function() {

     if($(this).css('background-color') != "rgb(0, 0, 255)"){
  

      if(correctCount == 10) {
      } else {
        let memoryPanelId = this.id;
      let memoryPanelIdLength = memoryPanelId.length;

      if (memoryCount == 2) {
        if(correct == 0) {
          $("#memoryBody" + memoryPanelKey1 + ", #memoryBody" + memoryPanelKey2).css({'display' : 'none'});
        }
        memoryCount = 0;
        memoryBodyText1 = "";
        memoryBodyText2 = "";
        memoryPanelKey = "";
        memoryPanelKey1 = "";
        memoryPanelKey2 = "";
      }
          
      if(memoryPanelIdLength == 12) {
        memoryPanelKey = memoryPanelId.substr(11, 1);
      } else if(memoryPanelIdLength == 13) {
        memoryPanelKey = memoryPanelId.substr(11, 2);
      }

      $("#memoryBody" + memoryPanelKey).css({'display' : 'block'});

      memoryCount += 1;

      if(memoryCount == 1) {
        memoryPanelKey1 = memoryPanelKey;
        memoryBodyText1 = $("#memoryBody" + memoryPanelKey1).text();
      } else {
        memoryPanelKey2 = memoryPanelKey;

        // 同じ場所を2回連続で押した時何もしない
        if(memoryPanelKey1 == memoryPanelKey2) {
          memoryCount = 1;
        } else {
          memoryBodyText2 = $("#memoryBody" + memoryPanelKey2).text();
          if(memoryBodyText1 == memoryBodyText2) {
            $("#memoryPanel" + memoryPanelKey1 + ", #memoryPanel" + memoryPanelKey2).css({'background-color' : 'blue'});


            correctSound.pause();
            correctSound.currentTime = 0.2;  
            correctSound.play();

            correct = 1;
            correctCount += 1;
            if(correctCount ==10) {
              $(".clear").show();
              clearInterval(countUpId);

              if(timerCount < 20) {
                memoryScore = "5";
              } else if(timerCount < 25) {
                memoryScore = "4";
              } else if(timerCount < 30) {
                memoryScore = "3";
              } else if(timerCount < 35) {
                memoryScore = "2";
              } else {
                memoryScore = "1";
              }

              url = location.href;
              parameters = url.split(/&|=/);
              totalScore = parameters[3] + memoryScore;

              if(parameters[1] == "comprehensive") {
                setTimeout(function() {
                  nextStage("judgement", totalScore);
                }, 3000);
              } else {
                totalScore = "m" + memoryScore;
                setTimeout(function() { 
                  resultStage(totalScore);
                }, 3000);
              }
            }
          } else {
            correct = 0;
          }
        }
      }
      }
     }
    })   
  // ここまで記憶力


  //　ここから判断力
  let judgeAnswerNum = 0;

  function judgeQuestionAnswerStart() {
    let relKanjiColorArray = {
      "黒" : "black", "白" : "white", "赤" : "red", "橙" : "orange", "黄" : "yellow", "緑" : "green", "青" : "blue", "紫" : "purple"
    }
    let judgementKanjiArray = ["黒", "白", "赤", "橙", "黄", "緑", "青", "紫"];
    let judgementColorArray = ["black", "white", "red", "orange", "yellow", "green", "blue", "purple",];

    let judgeKanjiCount = 8;
    let judgeColorCount = 8;
    let judgeKanjiNum = 0;
    let judgeColorNum = 0;
    
    // 答えの番号
    judgeAnswerNum = rand(4) + 1;
    let judgeQuestionKanji = "";
    let judgeQuestionColor = "";
  
    for(let i=1; i<=4; i++) {
      judgeKanjiNum = rand(judgeKanjiCount);
      judgeColorNum = rand(judgeColorCount);
      $("#judgement-panel" + i).text(judgementKanjiArray[judgeKanjiNum]);
      $("#judgement-panel" + i).css({'color' : judgementColorArray[judgeColorNum]});
  
      if(i == judgeAnswerNum) {
        judgeQuestionKanji = judgementKanjiArray[judgeKanjiNum];
        judgeQuestionColor = relKanjiColorArray[judgeQuestionKanji];
      }
      // answerKanjiArray.push(judgementKanjiArray[judgeKanjiNum]);
  
      judgementKanjiArray.splice(judgeKanjiNum, 1);
      judgementColorArray.splice(judgeColorNum, 1);
      
      judgeKanjiCount -= 1;
      judgeColorCount -= 1;
    }
  
    // リセット
    judgementKanjiArray = ["黒", "白", "赤", "橙", "黄", "緑", "青", "紫"];
  
    judgementColorArray = ["black", "white", "red", "orange", "yellow", "green", "blue", "purple",];
  
    // 問題作成
  
    // 問題の漢字
    $(".judgementMain").text(judgementKanjiArray[rand(8)]);
  
    // 問題の色
    $(".judgementMain").css({'color' : judgeQuestionColor});
  }

  judgeQuestionAnswerStart();
  
  let judgePlayCount = 0;

  $(".judgement-panel").on('click',function() {
    if(judgePlayCount < 10) {

      if(this.id == "judgement-panel" + judgeAnswerNum) {
    
        $(".judgeCorrectMiss").text("✅");
        judgePlayCount++;
        $(".judgePlayCount").text(judgePlayCount + "/10");

        correctSound.pause();
        correctSound.currentTime = 0.2;
        missSound.pause();
        correctSound.play();
      } else {
        $(".judgeCorrectMiss").text("❎");
        timerCount += 1;
        correctSound.pause();
        missSound.pause();
        missSound.currentTime = 0;  
        missSound.play();
      }


      if(judgePlayCount == 10) {
        $(".judgeClear").show();
        $(".judgeCorrectMiss").text("");
        clearInterval(countUpId);

        if(timerCount < 15) {
          judgementScore = "5";
        } else if(timerCount < 20) {
          judgementScore = "4";
        } else if(timerCount < 25) {
          judgementScore = "3";
        } else if(timerCount < 30) {
          judgementScore = "2";
        } else {
          judgementScore = "1";
        }


        url = location.href;
        parameters = url.split(/&|=/);
        totalScore = parameters[3] + judgementScore;

        if(parameters[1] == "comprehensive") {
          setTimeout(function() {
            nextStage("intuition", totalScore);
          }, 3000);
        } else {
          totalScore = "j" + judgementScore;
          setTimeout(function() { 
            resultStage(totalScore);
          }, 3000);
        }
      } else {
        judgeQuestionAnswerStart();
      }
    }
  })

  //　ここまで判断力


  // ここから計算力

  let calculationSelectedNum = 0;
  let nowAnswerNum = 0;

  let calcProblemCount = 0;

  $(".calculationPanel").on("click",function() {
    
    if(this.id == "calculationPanel11") {
      // 解答
      if(nowAnswerNum == calcAnswer) {
        $(".calcCorrectMiss").text("✅");
        calcProblemCount++;
        $(".calcProblemCount").text(calcProblemCount + "/10");

        correctSound.pause();
        correctSound.currentTime = 0.2;
        missSound.pause();
        correctSound.play();
      } else {
        $(".calcCorrectMiss").text("❎");

        correctSound.pause();
        missSound.pause();
        missSound.currentTime = 0;
        missSound.play();
      }

      if (calcProblemCount == 10) {
        $(".calcClear").show();
        $(".calcCorrectMiss").text("");
        clearInterval(countUpId);

        if(timerCount < 50) {
          calculationScore = "5";
        } else if(timerCount < 65) {
          calculationScore = "4";
        } else if(timerCount < 80) {
          calculationScore = "3";
        } else if(timerCount < 95) {
          calculationScore = "2";
        } else {
          calculationScore = "1";
        }

        url = location.href;
        parameters = url.split(/&|=/);
        totalScore = parameters[3] + calculationScore;
        if(parameters[1] == "comprehensive") {
          setTimeout(function() {
            nextStage("response", totalScore);
          }, 3000);
        } else {
          totalScore = "c" + calculationScore;
          setTimeout(function() { 
            resultStage(totalScore);
          }, 3000);
        }
      } else {
        $(".calculationAnswer").text("");
        nowAnswerNum = 0;
        calculationRandomSet();
      }
      
    } else if(this.id == "calculationPanel12") {
      nowAnswerNum = 0;
      $(".calculationAnswer").text(nowAnswerNum);
    } else {
      calculationSelectedNum = Number(this.textContent);
      if(nowAnswerNum < 10000) {
        nowAnswerNum = nowAnswerNum * 10 + calculationSelectedNum;
        $(".calculationAnswer").text(nowAnswerNum);
      }
    }
  })

  let calcPlusArray = [];
  let calcMinusArray1 = [];
  let calcMinusArray2 = [];
  let calcTimesArray = [];
  let calcDividedArray1 = [];
  let calcDividedArray2 = [];

  let calcSymbolArray = ["+", "-", "x", "÷"];

  function randomArray(exArray, firstNum, lastNum) {
    for(i=firstNum; i<=lastNum; i++) {
      exArray.push(i);
    }
  }

  randomArray(calcPlusArray, 10, 99);
  randomArray(calcMinusArray1, 11, 99);
  randomArray(calcMinusArray2, 10, 98);
  randomArray(calcTimesArray, 11, 19);
  randomArray(calcDividedArray1, 10, 99);
  randomArray(calcDividedArray2, 2, 9);


  let calcSymbolSet = 0;
  let calcLeftNum = 0;
  let calcRightNum = 0;
  let calcAnswer = 0;

  function calculationRandomSet() {
    
    calcSymbolSet = calcSymbolArray[rand(4)];
    if(calcSymbolSet == "+") {
      // 足し算
      calcLeftNum = calcPlusArray[rand(90)];
      calcRightNum = calcPlusArray[rand(90)];

      calcAnswer = Number(calcLeftNum) + Number(calcRightNum);

    } else if(calcSymbolSet == "-") {
      // 引き算
      calcLeftNum = calcMinusArray1[rand(89)];
      calcRightNum = calcMinusArray2[rand(Number(calcLeftNum) - 10)]

      calcAnswer = Number(calcLeftNum) - Number(calcRightNum);

    } else if(calcSymbolSet == "x") {
      // 掛け算
      calcLeftNum = calcTimesArray[rand(9)];
      calcRightNum = calcTimesArray[rand(9)];

      calcAnswer = Number(calcLeftNum) * Number(calcRightNum);
    } else {
      // 割り算
      calcRightNum = calcDividedArray2[rand(8)];

      let calcDividedArrayLeft = [];

      calcDividedArray1.forEach(element => {
        if(element % calcRightNum == 0) {
          calcDividedArrayLeft.push(element);
        } 
      });

      calcLeftNum = calcDividedArrayLeft[rand(calcDividedArrayLeft.length)]

      calcAnswer = calcLeftNum / calcRightNum;
    }

    $(".formula").text(calcLeftNum + " " + calcSymbolSet + " " +calcRightNum + " = ")
  }

  calculationRandomSet();

  // ここまで計算力


  // ここから反応力
  let clearConditions = 0;
  let opponentHand = 0;
  let responseProblemCount = 0;

  function jankenStart() {
    
    if(location.href.indexOf("response") != -1) {
      
      clearConditions = rand(3);

      if (clearConditions == 0) {
        $(".clearConditions").text("勝ってください!")
      } else if (clearConditions == 1) {
        $(".clearConditions").text("負けてください!");
      } else {
        $(".clearConditions").text("あいこにしてください!");
      }

      opponentHand = rand(3);

      if (opponentHand == 0) {
        document.getElementById('jankenOpponentImg').src='image/rock.png';
      } else if (opponentHand == 1) {
        document.getElementById('jankenOpponentImg').src='image/scissors.png';
      } else {
        document.getElementById('jankenOpponentImg').src='image/paper.png';
      }
    }
  }

  let responseCorrect = 0;

    $(".jankenMyImgWrap").on('click', function() {
      if (responseProblemCount < 10) {
        let jankenId = this.id;
        let myHandId = Number(jankenId.substr(6, 1)) - 1;
  
        if(clearConditions == 2) {
          if(myHandId == opponentHand) {
            responseCorrect = 1;
          } else {
            responseCorrect = 0;
          }
        } else if(clearConditions == 1) {
          if(myHandId == (opponentHand + 1) % 3) {
            responseCorrect = 1;
          } else {
            responseCorrect = 0;
          }
        } else {
          if(opponentHand == (myHandId + 1) % 3) {
            responseCorrect = 1;
          } else {
            responseCorrect = 0;
          }
        }

        if(responseCorrect == 1) {
          $(".responseCorrectMiss").text("✅");
          responseProblemCount++;
          $(".responseProblemCount").text(responseProblemCount + "/10");

          correctSound.pause();
          correctSound.currentTime = 0.2;
          missSound.pause();
          correctSound.play();
        } else {
          $(".responseCorrectMiss").text("❎");
          timerCount += 1;

          correctSound.pause();
          missSound.pause();
          missSound.currentTime = 0;
          missSound.play();
        }

        if(responseProblemCount == 10) {
          $(".clear").show();
          $(".responseCorrectMiss").text("");
          clearInterval(countUpId);

          if(timerCount < 15) {
            responseScore = "5";
          } else if(timerCount < 20) {
            responseScore = "4";
          } else if(timerCount < 25) {
            responseScore = "3";
          } else if(timerCount < 30) {
            responseScore = "2";
          } else {
            responseScore = "1";
          }
  
          url = location.href;
          parameters = url.split(/&|=/);
          totalScore = parameters[3] + responseScore;
          if(parameters[1] == "comprehensive") {
            setTimeout(function() {
              nextStage("result", totalScore);
            }, 3000);
          } else {
            totalScore = "r" + responseScore;
            setTimeout(function() { 
              resultStage(totalScore);
            }, 3000);
          }
        } else {
          jankenStart();
        }
      }
    })

  jankenStart();


  //ここから結果表示


  $("#result-home").on('click', function() {
    location.href = "index.html";
  })

  if(location.href.indexOf("result") != -1) {
    resultUrl = location.href;
    resultParameters = resultUrl.split(/&|=/);
    totalScore = resultParameters[3];

    let sumScore = 0;
    let starCount = 0;
    
    if(resultParameters[1].substr(0,1) == "o"){
      // 観察力
      $("#result1").text(resultParameters[1].substr(1, 1));
    } else if(resultParameters[1].substr(0,1) == "m") {
      // 記憶力
      $("#result2").text(resultParameters[1].substr(1, 1));
    } else if(resultParameters[1].substr(0,1) == "j") {
      // 判断力
      $("#result3").text(resultParameters[1].substr(1, 1));
    } else if(resultParameters[1].substr(0,1) == "i") {
      // 直感力
      $("#result4").text(resultParameters[1].substr(1, 1));
    } else if(resultParameters[1].substr(0,1) == "c") {
      // 計算力
      $("#result5").text(resultParameters[1].substr(1, 1));
    } else if(resultParameters[1].substr(0,1) == "r") {
      // 反応力
      $("#result6").text(resultParameters[1].substr(1, 1));
    }

    if(resultParameters[1] == "comprehensive") {
      // 総合力
      for(i=0;i<6;i++){
        $("#result" + (i + 1)).text(totalScore.substr(i, 1));
        sumScore += Number(totalScore.substr(i, 1));
      }
      starCount = Math.round(sumScore / 6);
    } else {
      // 総合力以外
      sumScore = Number(resultParameters[1].substr(1, 1));
      starCount = sumScore;
    }

    if(starCount > 1) {
      $("#star2").css({'color' : '#ffcf32'});
      if(starCount > 2) {
        $("#star3").css({'color' : '#ffcf32'});
        if(starCount > 3) {
          $("#star4").css({'color' : '#ffcf32'});
          if(starCount > 4) {
            $("#star5").css({'color' : '#ffcf32'});
          }
        }
      }
    }

    $("#result-retry").on('click', function() {
      if(resultParameters[1] == "comprehensive") {
        // 総合力
        location.href = "observe.html?name=comprehensive";
      } else if(resultParameters[1].substr(0,1) == "o"){
        // 観察力
        location.href = "observe.html";
      } else if(resultParameters[1].substr(0,1) == "m") {
        // 記憶力
        location.href = "memory.html";
      } else if(resultParameters[1].substr(0,1) == "j") {
        // 判断力
        location.href = "judgement.html";
      } else if(resultParameters[1].substr(0,1) == "i") {
        // 直感力
        location.href = "intuition.html";
      } else if(resultParameters[1].substr(0,1) == "c") {
        // 計算力
        location.href = "calculation.html";
      } else if(resultParameters[1].substr(0,1) == "r") {
        // 反応力
        location.href = "response.html";
      }
    })
  }
})