  function generateGameArr(){
    let result = [];
    let i = 0;
    let randCount = 0;
    while( i < 16 ){
      let rand = Math.random() >= 0.5;
      if(rand){
        randCount+=1;
      }
      if(randCount < 8){
        result.push( rand );
      }else{
        result.push( false );
      }
      i++;
    }
    return result;
  }

  function generateGameBoardHtml(arr, showAnswers=false){
    let boardHTML = '';

    let rowNum = 1;
    let id=0;
    arr.forEach( bool =>{
      if(rowNum === 1){
        boardHTML+="<ul>";
      }
      if(showAnswers){
        if(bool){
          boardHTML += `<li id="square-${id}" class='square active'></li>`;
        }else{
          boardHTML += `<li id="square-${id}" class='square'></li>`;
        }
      }else{
        boardHTML += `<li id="square-${id}" class='square'></li>`;
      }
      id+=1;
      rowNum+=1;
      if(rowNum === 5){
        rowNum = 1;
        boardHTML+="</ul>";
      }
    });
    return boardHTML;
  }

  function generateNewGame(){
    window.currentGame = generateGameArr();

    $JOM('#game-board').append(generateGameBoardHtml(window.currentGame, true));

    setTimeout( ()=>{
      $JOM('#game-board').empty();
      $JOM('#game-board').append(generateGameBoardHtml(window.currentGame, false));
    }, 2000);
  }

  generateNewGame();



  // let addListener = ()=>{
  //   $JOM('html').on("keypress", (e)=>{
  //     e.preventDefault();
  //     let keyPressed = e.key;
  //     alert('key pressed')
  //   });
  // }
  // $JOM(addListener)
