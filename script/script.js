let tempsTravail = 0
let tempsRepos = 0
const timerElement = document.getElementById("timer")

if (localStorage.getItem("inputTravail") != null) {
  document.getElementById('idTravail').value = localStorage.getItem("inputTravail")

  let input = document.getElementById("idTravail")
  if (input.value == ""){
    timerElement.innerText = "Invalid"
  }
  else if (input.value.split(':')[0] == "00"){
    timerElement.innerText = input.value.split(':')[1]+":"+input.value.split(':')[2]
  }
  else {
    timerElement.innerText = input.value
  }
}
else{
  document.getElementById('idTravail').value = "00:25:00"
}
if (localStorage.getItem("inputPause") != null) {
  document.getElementById('idPause').value = localStorage.getItem("inputPause")
}
else{
  document.getElementById('idPause').value = "00:05:00"
}

let temps = 1500
let travail = false
let bouton = document.getElementById("start")
let isStarted = false


const button = document.getElementById("start")

bouton.addEventListener('click', () => {
  if (isStarted) {
    location.reload();
  }
  else {
    isStarted = true;
    travail = true
    let tra = document.getElementById('travail')
    tra.style.color = "rgb(0, 20, 65)"
    tra.style.backgroundColor = "#FFFFFF"
    let valise = document.getElementById("valise")
    valise.style.color = "rgb(0, 20, 65)"
    bouton.className = "fa-solid fa-arrows-rotate"
    tempsTravail = parseInt(document.getElementById('idTravail').value.split(':')[0]) * 3600 + parseInt(document.getElementById('idTravail').value.split(':')[1]) * 60 + parseInt(document.getElementById('idTravail').value.split(':')[2])
    tempsRepos = parseInt(document.getElementById('idPause').value.split(':')[0]) * 3600 + parseInt(document.getElementById('idPause').value.split(':')[1]) * 60 + parseInt(document.getElementById('idPause').value.split(':')[2])
    localStorage.setItem("inputTravail", document.getElementById('idTravail').value);
    localStorage.setItem("inputPause", document.getElementById('idPause').value);

    let objet = document.getElementsByClassName("formulaire")
    for(var i= 0; i < objet.length; i++)
    {
      objet[i].style.display = "none"
    }
    if (Number.isInteger(tempsTravail)) { temps = tempsTravail }

    setInterval(() => {
      if (temps <= 0 && travail) {
        travail = false
        if (Number.isInteger(tempsTravail)) { temps = tempsRepos }
        else { temps = 300 }
        let pau = document.getElementById('pause')
        pau.style.color = "rgb(0, 20, 65)"
        pau.style.backgroundColor = "#FFFFFF"
        let tra = document.getElementById('travail')
        tra.style.color = "#FFFFFF"
        tra.style.backgroundColor = "rgb(0, 20, 65)"
        let valise = document.getElementById("valise")
        valise.style.color = "#FFFFFF"
        let tasse = document.getElementById('tasse')
        tasse.style.color = "rgb(0, 20, 65)"
      }
      if (temps <= 0 && !travail) {
        travail = true
        if (Number.isInteger(tempsTravail)) { temps = tempsTravail }
        else { temps = 15000 }
        let tra = document.getElementById('travail')
        tra.style.color = "rgb(0, 20, 65)"
        tra.style.backgroundColor = "#FFFFFF"
        let valise = document.getElementById("valise")
        valise.style.color = "rgb(0, 20, 65)"
        let pau = document.getElementById('pause')
        pau.style.color = "#FFFFFF"
        pau.style.backgroundColor = "rgb(0, 20, 65)"
        let tasse = document.getElementById('tasse')
        tasse.style.color = "#FFFFFF"
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
    }, 1000)
  }
})


let poubelle = document.getElementById("poubelle")
poubelle.addEventListener('click', () => {
  localStorage.clear()
  location.reload()
})

let input = document.getElementById("idTravail")
input.addEventListener("input", ()=>{
  if (input.value == ""){
    timerElement.innerText = "Invalid"
  }
  else if (input.value.split(':')[0] == "00"){
    timerElement.innerText = input.value.split(':')[1]+":"+input.value.split(':')[2]
  }
  else {
    timerElement.innerText = input.value
  }
})