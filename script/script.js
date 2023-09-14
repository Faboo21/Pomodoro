let tempsTravail = 5
let tempsRepos = 25

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
      if (temps <= 0 && travail){
        travail = false
        temps = tempsRepos
        let etat = document.getElementById('etat')
        etat.innerText = 'Pause'
      }
      if (temps <= 0 && !travail){
        travail = true
        temps = tempsTravail
        let etat = document.getElementById('etat')
        etat.innerText = 'Travail'
      }

      let minutes = parseInt(temps / 60, 10)
      let secondes = parseInt(temps % 60, 10)

      minutes = minutes < 10 ? "0" + minutes : minutes
      secondes = secondes < 10 ? "0" + secondes : secondes
      temps = temps <= 0 ? 0 : temps - 1
      timerElement.innerText = `${minutes}:${secondes}`

    }, 1000)
  }
})

function Envoi() {
// Récupérer la valeur des champs nom et email
var formTravail = document.getElementById('idTravail').value;
var formPause = document.getElementById('idEmail').value;

document.getElementById('idNom').style.backgroundColor="#9C6";
document.getElementById('idEmail').style.backgroundColor="#9C6";
}