var db = firebase.database()

const logout = document.getElementById('logout')
const myProps = document.getElementById('myProps')


firebase.auth().onAuthStateChanged(function(u) {
  if (u) {
    retriveProps(u)
  } else {
    window.location = "index.html"
  }
})

function retriveProps(user) {
  firebase.database().ref('users/' + user.uid + '/proposals/').once('value', function(snap) {
    snap.forEach(function(s) {
      var name = document.createElement('h4') // poposal etkinlik adi
      var desc = document.createElement('p') // etkinlik tanitimi
      var newActAll = document.createElement('div') // butun div
      var seper = document.createElement('hr') // hr
      var viewBtn = document.createElement('button')

      newActAll.appendChild(name)
      newActAll.appendChild(desc)
      myProps.appendChild(newActAll)
      myProps.appendChild(viewBtn)
      myProps.appendChild(seper)

      viewBtn.innerHTML = "Teklifi goruntule"
      viewBtn.className += "btn btn-primary"
      newActAll.className += "teklif"

      name.innerHTML = s.val().name
      desc.innerHTML = s.val().description

      viewBtn.onclick = function() {
        firebase.database().ref('users/' + user.uid + '/currentProposal/').set(s.val())
        window.location = "proposal.html"
      }

    })
  })
}

logout.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    console.log("successfully logged out");
    window.location = "index.html"
  })
})
