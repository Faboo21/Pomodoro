// Definition des Variables
let tempsTravail = 0
let tempsRepos = 0
let temps = 0
let travail = false
let isStarted = false

// Recuperation des objets de la page
const bouton = document.getElementById("start")
const timerElement = document.getElementById("timer")
const valise = document.getElementById("valise")
const tasse = document.getElementById('tasse')
const poubelle = document.getElementById("poubelle")
const etatPause = document.getElementById('pause')
const etatTravail = document.getElementById('travail')
const objet = document.getElementsByClassName("formulaire")
const inputTravail = document.getElementById("idTravail")
const inputPause = document.getElementById('idPause')

// Test du localhost et mise en place du timer en conéquences
if (localStorage.getItem("inputTravail") != null && localStorage.getItem("inputTravail") != null) {
  // localhost existe donc recuperation des valeurs
  inputTravail.value = localStorage.getItem("inputTravail")
  inputPause.value = localStorage.getItem("inputPause")

  // affichage du timer
  if (inputTravail.value == "") timerElement.innerText = "Invalid" // temps invalid (case de selection vide)
  else if (inputTravail.value.split(':')[0] == "00") timerElement.innerText = inputTravail.value.split(':')[1] + ":" + inputTravail.value.split(':')[2] // minutes seulement
  else timerElement.innerText = inputTravail.value // avec heures
}
else {
  // sinon valeurs par defauts
  timerElement.innerText = "25:00"
  inputTravail.value = "00:25:00"
  inputPause.value = "00:05:00"
}

// Action au clic du bouton
bouton.addEventListener('click', () => {
  // si le timer etait démarré refresh de la page
  if (isStarted) {
    location.reload();
  }
  // sinon lancement du timer
  else {
    isStarted = true; // indique que le timer démarre
    travail = true // periode de travail

    // changement de design de bouton
    bouton.className = "fa-solid fa-arrows-rotate"

    // recuperation des inputs 
    tempsTravail = parseInt(inputTravail.value.split(':')[0]) * 3600 + parseInt(inputTravail.value.split(':')[1]) * 60 + parseInt(inputTravail.value.split(':')[2])
    tempsRepos = parseInt(inputPause.value.split(':')[0]) * 3600 + parseInt(inputPause.value.split(':')[1]) * 60 + parseInt(inputPause.value.split(':')[2])

    // ajout des temps au localhost
    localStorage.setItem("inputTravail", inputTravail.value);
    localStorage.setItem("inputPause", inputPause.value);

    // on cache les elements pour changer le temps
    for (var i = 0; i < objet.length; i++) { objet[i].style.display = "none" }

    // on initialize notre timer au temps de travail si il est possible sinon on le met a 25 min
    if (Number.isInteger(tempsTravail)) { temps = tempsTravail }
    else temps = 1500

    setInterval(() => {
      if (temps <= 0 && travail) { // fin de periode de travail
        travail = false // passe au repos
        if (Number.isInteger(tempsTravail)) { temps = tempsRepos } // met le timer au temps de repos si possible sinon a 5 min
        else { temps = 300 } 
      }
      if (temps <= 0 && !travail) { // fin de periode de repos
        travail = true // passe au travail
        if (Number.isInteger(tempsTravail)) { temps = tempsTravail } // met le timer au temps de travail si possible sinon a 25 min
        else { temps = 15000 } 
      }

      // calculs Heures Minutes Secondes
      let heure = parseInt(temps / 3600, 10)
      let minutes = parseInt(temps % 3600 / 60, 10)
      let secondes = parseInt(temps % 60, 10)

      // affichage du timmer
      heure = heure < 10 ? "0" + heure : heure
      minutes = minutes < 10 ? "0" + minutes : minutes
      secondes = secondes < 10 ? "0" + secondes : secondes
      if (temps > 3600)
        timerElement.innerText = `${heure}:${minutes}:${secondes}`
      else
        timerElement.innerText = `${minutes}:${secondes}`

      temps = temps <= 0 ? 0 : temps - 1 // incremente d'une seconde le timer

      if (travail) { // affichage en temps de travail
        etatTravail.style.color = "rgb(0, 20, 65)"
        etatTravail.style.backgroundColor = "#FFFFFF"
        valise.style.color = "rgb(0, 20, 65)"
        etatPause.style.color = "#FFFFFF"
        etatPause.style.backgroundColor = "rgb(0, 20, 65)"
        tasse.style.color = "#FFFFFF"
      }
      else if (!travail) { // affichage en temps de repos
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

// action du bouton reset
poubelle.addEventListener('click', () => {
  localStorage.clear() // vide le localhost
  location.reload() // recharge la page
})

inputTravail.addEventListener("input", () => { // modifie le timer en direct de l'input travail
  if (inputTravail.value == "") timerElement.innerText = "Invalid" // temps invalid (case de selection vide)
  else if (inputTravail.value.split(':')[0] == "00") timerElement.innerText = inputTravail.value.split(':')[1] + ":" + inputTravail.value.split(':')[2] // minutes seulement
  else timerElement.innerText = inputTravail.value // avec heures
})