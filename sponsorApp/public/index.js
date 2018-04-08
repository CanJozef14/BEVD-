// fetch firebase
var db = firebase.database()

// fetch the DOM
const uname = document.getElementById('uname')
const email = document.getElementById('email')
const tel = document.getElementById('tel')
const password = document.getElementById('password')

const signup = document.getElementById('signup')
const login = document.getElementById('login')

const loginAlert = document.getElementById('loginAlert')
const loginErr = document.getElementById('loginErr')

signup.addEventListener('click', function() {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(function(res) {
    var type;
    var des;
    if (document.getElementById('radio1').checked) {
      type = "e"
      des = "no need"
    } else {
      type = "k"
      des = "not written yet"
    }
    var newuser = {
      username: uname.value,
      email: email.value,
      uid: res.uid,
      phoneNumber: tel.value,
      userType: type,
      description: des
    }
    firebase.database().ref('users/' + res.uid + '/').set(newuser)
  }).catch(function(err) {
    console.log(err);
    loginErr.innerHTML = "Kayitta hata, birkac dakika sonra tekrar deneyiniz"
    console.log('here');
    loginAlert.classList.remove('hidden')
    loginAlert.style.display = ""
  })
})

login.addEventListener('click', function() {
  firebase.auth().signInWithEmailAndPassword(document.getElementById('email2').value, document.getElementById('password2').value).then(function(res) {
    // window.location = "main.html"
  }).catch(function(err) {
    console.log(err);
    loginErr.innerHTML = "Girdiginiz sifre veya mail adresi hatalidir"
    console.log('burada');
    loginAlert.classList.remove('hidden')
    loginAlert.style.display = ""
  })
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    db.ref('users/' + user.uid).once('value', function(s) {
      if (s.val().userType == "e") {
          window.location = "main.html"
      } else {
          window.location = "kurum.html"
      }
    })

  }
})
