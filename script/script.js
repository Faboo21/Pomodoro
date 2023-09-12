let tempsTravail = 25
let tempsRepos = 5

let travail = false
let bouton = document.getElementById("start")
let isStarted = false

const timerElement = document.getElementById("timer")
const button = document.getElementById("start")

bouton.addEventListener('click', () => {
  if (isStarted) {
    location.reload();
  }
  else {
    isStarted = true;
    travail = true
    bouton.className = "fa-solid fa-arrows-rotate"

    let temps = tempsTravail
    setInterval(() => {
      let minutes = parseInt(temps / 60, 10)
      let secondes = parseInt(temps % 60, 10)

      minutes = minutes < 10 ? "0" + minutes : minutes
      secondes = secondes < 10 ? "0" + secondes : secondes

      timerElement.innerText = `${minutes}:${secondes}`
      temps = temps <= 0 ? 0 : temps - 1
      if (temps <= 0 && travail){
        travail = false
        temps = tempsRepos
      }
      if (temps <= 0 && !travail){
        travail = true
        temps = tempsTravail
      }
    }, 1000)
  }
})