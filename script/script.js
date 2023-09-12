let temps = 15
let travail = true
let start
const timerElement = document.getElementById("timer")
const button = document.getElementById("start")

let bouton = document.getElementById("start")
let isStarted = false
bouton.addEventListener('click', () => {
  if (isStarted) {
    location.reload();
  }
  else {
    isStarted = true;
    setInterval(() => {
      let minutes = parseInt(temps / 60, 10)
      let secondes = parseInt(temps % 60, 10)

      minutes = minutes < 10 ? "0" + minutes : minutes
      secondes = secondes < 10 ? "0" + secondes : secondes

      timerElement.innerText = `${minutes}:${secondes}`
      temps = temps <= 0 ? 0 : temps - 1
    }, 1000)

  }
})