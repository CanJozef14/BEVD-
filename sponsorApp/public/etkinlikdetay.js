var db = firebase.database()

// fetch the DOM
const name = document.getElementById('name')
const organizer = document.getElementById('organizer')
const yer = document.getElementById('yer')
const description =document.getElementById('description')
const num = document.getElementById('num')
const dosya = document.getElementById('dosya')

const save = document.getElementById('save')
const logout = document.getElementById('logout')

firebase.auth().onAuthStateChanged(function(u) {
  if (u) {

    dosya.addEventListener('change', function(e) {
      var file = e.target.files[0]
      var storageRef = firebase.storage().ref(u.uid)
      storageRef.put(file)
    })


    save.addEventListener('click', function() {
      var myEvent = {
        name: name.value,
        organizer: organizer.value,
        location: yer.value,
        description: description.value,
        submitter: u.uid,
        people: num.value
      }
      firebase.database().ref('users/' + u.uid + '/myEvent/').set(myEvent)
      window.location = "main.html"
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
