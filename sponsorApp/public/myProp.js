// fetch firebase
var db = firebase.database()

// fetch the DOM
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
  firebase.database().ref('users/' + user.uid + '/myProposals').once('value', function(snap) {
    snap.forEach(function(s) {
      console.log(s);
      var mediaAll = document.createElement('div') // class: media
      var logo = document.createElement('img') // class mr-3
      var inside = document.createElement('div') // media body
      var name = document.createElement('h5') // class: mt-0
      var desc = document.createElement('p') // company description
      var prop = document.createElement('button') // button
      var seper = document.createElement('hr')

      mediaAll.className += "media alanli"
      logo.className += "mr-3 logoImg"
      inside.className += "media-body"
      name.className += "mt-0"
      prop.className += "btn btn-outline-danger"
      prop.innerHTML = "Gorusmeyi Incele"

      firebase.database().ref('users/' + s.val().aliciKurum).once('value', function(alici) {
        name.innerHTML = alici.val().username
        desc.innerHTML = alici.val().description
        logo.alt = "no logo yet"
        console.log(alici.val().name);
        console.log(alici.val().description);

        var logoRef = firebase.storage().ref(alici.key)
        logoRef.getDownloadURL().then(function(url) {
          console.log(url);
          logo.src = url
        })
      })



      inside.appendChild(name)
      inside.appendChild(desc)
      inside.appendChild(prop)
      mediaAll.appendChild(inside)
      mediaAll.appendChild(logo)
      myProps.appendChild(mediaAll)
      myProps.appendChild(seper)

      prop.onclick = function() {
        firebase.database().ref('users/' + user.uid + '/currentProposal/').set(s.val())
        window.location = "viewMyProposal.html"
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
