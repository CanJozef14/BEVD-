// fetch firebase
var db = firebase.database()

// fetch the DOM
const logo = document.getElementById('logo')
const name = document.getElementById('name')
const description = document.getElementById('description')

const pastMessages = document.getElementById('pastMessages')
const message = document.getElementById('message')
const subres = document.getElementById('subres')

const logout = document.getElementById('logout')


firebase.auth().onAuthStateChanged(function(u) {
  if (u) {
    retriveCurrentInfo(u)
    retrivePastMessages(u)
    subres.addEventListener('click', function() {
      var newMesKey = firebase.database().ref().child('mes').push().key
      var newMes = {
        sender: "Etkinlikci",
        cont: message.value,
      }
      firebase.database().ref('users/' + u.uid + '/currentProposal/messages/' + newMesKey).set(newMes)
      firebase.database().ref('users/' + u.uid + '/currentProposal').once('value', function(snap) {
        firebase.database().ref('users/' + snap.val().aliciKurum + '/proposals/' + snap.key + '/messages/' + newMesKey).set(newMes)
        firebase.database().ref('users/' + snap.val().submitter + '/myProposals/' + snap.val().key + '/messages/' + newMesKey).set(newMes)
      })
    })
  } else {
    window.location = "index.html"
  }
})

function retriveCurrentInfo(user) {
  firebase.database().ref('users/' + user.uid + '/currentProposal').once('value', function(snap) {
    name.innerHTML = snap.val().name
    description.innerHTML = snap.val().description
    var logoRef = firebase.storage().ref(snap.val().aliciKurum)
    logoRef.getDownloadURL().then(function(url) {
      console.log(url);
      logo.src = url
    })

  })
}

function retrivePastMessages(user) {
  firebase.database().ref('users/' + user.uid + '/currentProposal/message').once('value', function(snap) {
    var newMessage = document.createElement('p')
    var seper = document.createElement('hr')

    pastMessages.appendChild(newMessage)
    pastMessages.appendChild(seper)

    newMessage.innerHTML = snap.val().sender + ": " + snap.val().cont
  }).catch(function(rte) {
    console.log(rte);
  })
}

logout.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    console.log("successfully logged out");
    window.location = "index.html"
  })
})
