let tempsTravail = 0
let tempsRepos = 0
let temps = 1500
let travail = false
let isStarted = false

const bouton = document.getElementById("start")
const timerElement = document.getElementById("timer")
const button = document.getElementById("start")
const valise = document.getElementById("valise")
const tasse = document.getElementById('tasse')
const poubelle = document.getElementById("poubelle")
const etatPause = document.getElementById('pause')
const objet = document.getElementsByClassName("formulaire")
const etatTravail = document.getElementById('travail')
const inputTravail = document.getElementById("idTravail")
const inputPause = document.getElementById('idPause')

if (localStorage.getItem("inputTravail") != null && localStorage.getItem("inputTravail") != null) {
  inputTravail.value = localStorage.getItem("inputTravail")
  inputPause.value = localStorage.getItem("inputPause")

  if (inputTravail.value == "") timerElement.innerText = "Invalid"
  else if (inputTravail.value.split(':')[0] == "00") timerElement.innerText = inputTravail.value.split(':')[1]+":"+inputTravail.value.split(':')[2]
  else timerElement.innerText = inputTravail.value
}
else{
  timerElement.innerText = "25:00"
  inputTravail.value = "00:25:00"
  inputPause.value = "00:05:00"
}

bouton.addEventListener('click', () => {
  if (isStarted) {
    location.reload();
  }
  else {
    isStarted = true;
    travail = true
    
    etatTravail.style.color = "rgb(0, 20, 65)"
    etatTravail.style.backgroundColor = "#FFFFFF"
    valise.style.color = "rgb(0, 20, 65)"
    bouton.className = "fa-solid fa-arrows-rotate"
    
    tempsTravail = parseInt(inputTravail.value.split(':')[0]) * 3600 + parseInt(inputTravail.value.split(':')[1]) * 60 + parseInt(inputTravail.value.split(':')[2])
    tempsRepos = parseInt(inputPause.value.split(':')[0]) * 3600 + parseInt(inputPause.value.split(':')[1]) * 60 + parseInt(inputPause.value.split(':')[2])
    
    localStorage.setItem("inputTravail", inputTravail.value);
    localStorage.setItem("inputPause", inputPause.value);
    
    for(var i= 0; i < objet.length; i++){objet[i].style.display = "none"}
    
    temps = tempsTravail - 1

    setInterval(() => {
      if (temps <= 0 && travail) {
        travail = false
        temps = tempsRepos
      }
      if (temps <= 0 && !travail) {
        travail = true
        temps = tempsTravail
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
        etatTravail.style.color = "rgb(0, 20, 65)"
        etatTravail.style.backgroundColor = "#FFFFFF"
        valise.style.color = "rgb(0, 20, 65)"
        etatPause.style.color = "#FFFFFF"
        etatPause.style.backgroundColor = "rgb(0, 20, 65)"
        tasse.style.color = "#FFFFFF"
      }
      else if (!travail){
        etatPause.style.color = "rgb(0, 20, 65)"
        etatPause.style.backgroundColor = "#FFFFFF"
        etatTravail.style.color = "#FFFFFF"
        etatTravail.style.backgroundColor = "rgb(0, 20, 65)"
        valise.style.color = "#FFFFFF"
        tasse.style.color = "rgb(0, 20, 65)"
      }
    }, 1000)
  }
})

poubelle.addEventListener('click', () => {
  localStorage.clear()
  location.reload()
})

inputTravail.addEventListener("input", ()=>{
  if (inputTravail.value == "") timerElement.innerText = "Invalid"
  else if (inputTravail.value.split(':')[0] == "00") timerElement.innerText = inputTravail.value.split(':')[1]+":"+inputTravail.value.split(':')[2]
  else timerElement.innerText = inputTravail.value
})