let tempsTravail = 0
let tempsRepos = 0

let temps = 1500
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
    tempsTravail = parseInt(document.getElementById('idTravail').value.split(':')[0]) * 3600 + parseInt(document.getElementById('idTravail').value.split(':')[1])*60 + parseInt(document.getElementById('idTravail').value.split(':')[2])
    tempsRepos = parseInt(document.getElementById('idPause').value.split(':')[0]) * 3600 + parseInt(document.getElementById('idPause').value.split(':')[1])*60 + parseInt(document.getElementById('idPause').value.split(':')[2])
    if (Number.isInteger(tempsTravail)){temps = tempsTravail}
    
    setInterval(() => {
      if (temps <= 0 && travail){
        travail = false
        if (Number.isInteger(tempsTravail)){temps = tempsRepos}
        else {temps = 300}
        let etat = document.getElementById('etat')
        etat.innerText = 'Pause'
      }
      if (temps <= 0 && !travail){
        travail = true
        if (Number.isInteger(tempsTravail)){temps = tempsTravail}
        else {temps = 15000}
        let etat = document.getElementById('etat')
        etat.innerText = 'Travail'
      }

      let heure = parseInt(temps / 3600, 10)
      let minutes = parseInt(temps % 3600 / 60, 10)
      let secondes = parseInt(temps % 60, 10)

      heure = heure < 10 ? "0" + heure : heure
      minutes = minutes < 10 ? "0" + minutes : minutes
      secondes = secondes < 10 ? "0" + secondes : secondes
      temps = temps <= 0 ? 0 : temps - 1
      if (temps > 3600)
      timerElement.innerText = `${heure}:${minutes}:${secondes}`
      else 
      timerElement.innerText = `${minutes}:${secondes}`

      if (travail){
        let etat = document.getElementById('etat')
        etat.style.borderColor = "red"
      }
      if (!travail){
        let etat = document.getElementById('etat')
        etat.style.borderColor = "green"
      }
    }, 10)
  }
})


