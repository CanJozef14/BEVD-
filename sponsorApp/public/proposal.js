// fetch firebase
var db = firebase.database()

// fetch the DOM
const name = document.getElementById('name')
const org = document.getElementById('org')
const loc = document.getElementById('loc')
const num = document.getElementById('num')
const desc = document.getElementById('desc')
const folder = document.getElementById('folder')

const response = document.getElementById('response')
const subres = document.getElementById('subres')
const pastMessages = document.getElementById('pastMessages')

const logout = document.getElementById('logout')

logout.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    console.log("successfully logged out");
    window.location = "index.html"
  })
})

firebase.auth().onAuthStateChanged(function(u) {
  if (u) {
    viewPropInfo(u)
    subres.addEventListener('click', function() {
      var newMesKey = firebase.database().ref().child('mes').push().key
      var newMes = {
        sender: "Firma",
        cont: response.value,
      }
      firebase.database().ref('users/' + u.uid + '/currentProposal/messages/' + newMesKey).set(newMes)
      firebase.database().ref('users/' + u.uid + '/currentProposal').once('value', function(snap) {
        firebase.database().ref('users/' + u.uid + '/proposals/' + snap.val().key + '/').set(snap.val())
        firebase.database().ref('users/' + snap.val().submitter + '/myProposals/' + snap.val().key).set(snap.val())
      })
    })
  } else {
    window.location = "index.html"
  }
})


function viewPropInfo(user) {
  firebase.database().ref('users/' + user.uid + '/currentProposal/').once('value', function(snap) {
    console.log(snap.val().name);
    name.innerHTML = snap.val().name
    org.innerHTML = "Organizator: " + snap.val().organizer
    loc.innerHTML = "Loasyon: " + snap.val().location
    num.innerHTML = "Kisi sayisi: " + snap.val().people
    desc.innerHTML = "Aciklama: " + snap.val().description
    var folderRef = firebase.storage().ref(snap.val().submitter)
    folderRef.getDownloadURL().then(function(url) {
      console.log(url);
      folder.href = url
    })
  })
  firebase.database().ref('users/' + user.uid + '/currentProposal/messages').once('value', function(snap) {
    snap.forEach(function(s) {
      console.log(s);
      var message = document.createElement('p')
      var seper = document.createElement('hr')
      pastMessages.appendChild(message)
      message.innerHTML = s.val().sender + ": " + s.val().cont
      pastMessages.appendChild(seper)
    })
  })
}
