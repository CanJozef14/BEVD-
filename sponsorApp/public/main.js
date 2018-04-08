// fetch firebase
var db = firebase.database()

// fetch the DOM
const myFirms = document.getElementById('myFirms')
const logout = document.getElementById('logout')

firebase.auth().onAuthStateChanged(function(u) {
    if(u) {
      retriveFirms(u)
  } else {
	   window.location = "index.html"
  }
})

function retriveFirms(user) {
  firebase.database().ref('users/').once('value', function(snap) {
    snap.forEach(function(s) {
      if (s.val().userType === "k") {
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
        prop.innerHTML = "Teklif Yolla"

        name.innerHTML = s.val().username
        desc.innerHTML = s.val().description
        logo.alt = "no logo yet"

        var logoRef = firebase.storage().ref(s.key)
        logoRef.getDownloadURL().then(function(url) {
          console.log(url);
          logo.src = url
        })

        inside.appendChild(name)
        inside.appendChild(desc)
        inside.appendChild(prop)
        mediaAll.appendChild(inside)
        mediaAll.appendChild(logo)
        myFirms.appendChild(mediaAll)
        myFirms.appendChild(seper)

        prop.onclick = function() {

          firebase.database().ref('users/' + user.uid + '/myEvent/').once('value', function(myEv) {
            console.log(s);
            var newPropKey = firebase.database().ref().child('proposal').push().key

            var newProposal = {
                name: myEv.val().name,
                organizer: myEv.val().organizer,
                location: myEv.val().location,
                description: myEv.val().description,
                submitter: myEv.val().submitter,
                people: myEv.val().people,
                stat: "0",
                key: newPropKey,
                aliciKurum: s.key
            }

            firebase.database().ref('users/' + s.key + '/proposals/' + newPropKey).set(newProposal)
            firebase.database().ref('users/' + user.uid + '/myProposals/' + newPropKey).set(newProposal)
          })
        }

      } // buraya kadar
    })
  })
}

logout.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    console.log("successfully logged out");
    window.location = "index.html"
  })
})
