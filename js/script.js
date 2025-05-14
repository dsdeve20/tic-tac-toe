let playerXname = ''
let playerYname = ''
const player_form = document.getElementsByClassName('players-form')[0]
const player_container_form = document.querySelector('.player-form-container')
const main_parent_box = document.querySelector('.main-parent-box')
const player_turn = document.querySelector('.player-turn')
const container_fireworks = document.querySelector('.fireworks')
const fireworks = new Fireworks.default(container_fireworks)
const restart_button = document.querySelector('.restart-button')

let whoseTurn = 'X' 
player_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const pl1 = player_form.elements['player1'].value
  const pl2 = player_form.elements['player2'].value
  playerXname = pl1
  playerYname = pl2
  player_container_form.style.display = 'none'
  main_parent_box.style.display = 'block'
  player_turn.innerHTML = (whoseTurn=='X') ? playerXname : playerYname
})


let arrayX = []
let arrayY = []
let winarray = [[0,3,6],[0,1,2],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[0,4,8],[6,4,2]]
const boxes = document.querySelectorAll('.box')
boxes.forEach((element)=>{
    element.addEventListener('click',(event)=>{
      element.innerHTML = whoseTurn
      element.classList.add('disabled')
      const boxindex =  element.getAttribute('attr')
      if(whoseTurn == 'X'){
        //Check if x wins
        arrayX.push(Number(boxindex))
        const whowin = checkWhoWins()
        console.log(whowin)
        if(whowin){
          fireworks.start()
          container_fireworks.style.zIndex = 2
          restart_button.style.display = 'none'
          alert(`Player X wins`)
          return false
        }
        else{
          whoseTurn = 'O'
          player_turn.innerHTML = (whoseTurn=='X') ? playerXname : playerYname
        }
      }
      else{
        //Check if O wins
        arrayY.push(Number(boxindex))
        const whowin = checkWhoWins()
        if(whowin){
            fireworks.start()
            container_fireworks.style.zIndex = 2
            restart_button.style.display = 'none'
            alert(`Player O wins`)
            return false
        }
        else{
          whoseTurn = 'X'
          player_turn.innerHTML = (whoseTurn=='X') ? playerXname : playerYname
        }
      } 
    })
})

const checkWhoWins = () =>{
  if(whoseTurn === 'X'){
    console.log(winarray)
    console.log(arrayX)
    for (const element1 of winarray) {
      let count = 0
      for (const element2 of element1) {
        const winelement = Number(element2)
        const index = arrayX.indexOf(winelement)
        if(index !== -1){
          count += 1
        }
      }
      if(count === 3){
        return true
      }
    }
  }

  if(whoseTurn == 'O'){
    for (const element1 of winarray) {
      let count = 0
      for (const element2 of element1) {
        const winelement = Number(element2)
        const index = arrayY.indexOf(winelement)
        if(index !== -1){
          count += 1
        }
      }
      if(count === 3){
        return true
      }
    }
  }
  return false
}

restart_button.addEventListener('click',()=>{
  arrayX = []
  arrayY = []
  boxes.forEach((element)=>{
    element.innerHTML = ''
    element.classList.remove('disabled')
    whoseTurn = 'X'
    player_turn.innerHTML = (whoseTurn=='X') ? playerXname : playerYname
  })
})
