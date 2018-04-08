// fetch firebase
var db = firebase.database()

// fetch the DOM
const description = document.getElementById('description')
const submit = document.getElementById('submit')
const logo = document.getElementById('logo')
const logout = document.getElementById('logout')

firebase.auth().onAuthStateChanged(function(u) {
  if (u) {

    submit.addEventListener('click', function() {
      var updates = {}
      updates['users/' + u.uid + '/description'] = description.value
      firebase.database().ref().update(updates)
    })

    logo.addEventListener('change', function(e) {
      var file = e.target.files[0]
      var storageRef = firebase.storage().ref(u.uid)
      storageRef.put(file)
    })

  } else {
    window.location = "index.html"
  }
})

logout.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    console.log("successfully logged out");
    window.location = "index.html"
  })
})
