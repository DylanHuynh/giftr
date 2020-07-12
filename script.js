var timmyName = "Timmy";
var timmyBirthday = "1/1"
var timmyInterest = ["nothing","clowning"];
var isAUser;
var displayName;
var userEmail;
var userEmail;

// Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyC1s03_fhia0iroLK051rM0Z1PrJCuqIE0",
  authDomain: "giftr-2fd80.firebaseapp.com",
  databaseURL: "https://giftr-2fd80.firebaseio.com/",
  projectId: "giftr-2fd80",
  storageBucket: "giftr-2fd80.appspot.com",
  appId: "1:1058684262650:web:efddcb204c7e56bd825143",
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var ref = database.ref('users');

// when the window onloads
window.onload = function() {

  console.log("window loaded");
  console.log(document.URL);
// Check if the page is the index.html
  if(!(document.URL.includes("signUp")||document.URL.includes("personProfile")||document.URL.includes("gettingStarted")||document.URL.includes("userProfile"))){
    console.log("at login");

    if(isAUser){
      window.location.assign("https://giftr.kimiasattary.repl.co/personProfile.html");
    }
    // create a consts for the inputs in order to sign in
    const loginbtn = document.getElementById("login");
    console.log("loginbtn created, id: " + loginbtn.id);
    
    const loginEmail = document.getElementById("loginEmail");
    console.log("loginEmail created, id: " + loginEmail.id);

    const loginPassword = document.getElementById("loginPassword");
    console.log("loginPassword created, id: " + loginPassword);
    
    // If login button exists and is clicked sign in
    if(loginbtn){
      loginbtn.addEventListener('click', e =>{
        
        console.log("loginbtn clicked");
        const email = loginEmail.value;
        const password = loginPassword.value;
        
        console.log(email + ", " + password);
        
        const auth = firebase.auth();
        
        //error
        const promise = auth.signInWithEmailAndPassword(email, password). catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;

          if(errorCode === 'auth/wrong-password'){
            alert('wrong password');
          }
          else{
            alert('errorMessage');
          }
          console.log(error);
        });

      });
      initApp();
    }
  }
  if(document.URL.includes("gettingStarted")) {
    console.log("on page");
      //Adding interests
    document.getElementById("addInterest").addEventListener("click", function(){
      console.log("clicked interests");
      document.getElementById("interest").innerHTML += '<p>JoeMama</p>';
      
      //'</br><input class="pad-input interest" type="text" id="interest" style="line-height: 25px"placeholder="Single word keywords, i.e.-running" multiple>'
    });
  }
    
  if(document.URL.includes("personProfile")) {
  }

  console.log("right before signUp checked");
  
  if(document.URL.includes("signUp")){

  
    
    const submitbtn = document.getElementById("signUpSubmit");
    console.log("signUpSubmitbtn created, id: " + submitbtn.id);

    const signUpEmail = document.getElementById("email");
    console.log("signUpEmail created, id: " + signUpEmail.id);

    const signUpPassword = document.getElementById("password");
    console.log("signUpPassword created, id: " + signUpPassword.id);
    console.log(signUpEmail);

    const goToLoginbtn = document.getElementById("goToLogin");
    console.log("goToLoginbtn created, id: " + goToLoginbtn.id);


    if(submitbtn){
      submitbtn.addEventListener('click', e => {
        console.log(signUpEmail);

        console.log(signUpEmail.value + ", " + signUpPassword.value);
        const email = signUpEmail.value;
        const password = signUpPassword.value;

        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        console.log("submit again");

        promise
          .catch(e => console.log(e.message));
        writeUserData(password, email);
        console.log(promise);       
        });

        
      }
    }
  
  
};



 function gotData(data) {
    var scores = data.val();
    var keys = Object.keys(scores);
    var initials = scores[keys[0]].email;
    console.log(initials);
    firebase.database().ref().child('users');
  }

  function errData(err) {
    console.log('Error');
  }

function writeUserData(password, email) {
  var data1 = {
    password: password,
    email: email,

  }
  ref.push(data1);

  //firebase.database().ref('users/' + userId).set(password);
}
  //printing data out

   ref.on('value', gotData, errData);  

function initApp() {

  // checks if user is logged in or out
  firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log("check status");
    if (firebaseUser) {
      isAUser = true;
      console.log(isAUser)
      console.log("STATUS: ON")
      console.log(firebaseUser);

      displayName = firebaseUser.displayName;
      userEmail = firebaseUser.email;
      userId = firebaseUser.uid;
      console.log(userId);

    }
    else {
      isAUser = false;
      console.log("not logged");
    }
  });
}


//if user is logged in
// var user = firebase.auth().currentUser;
// var name, email, photoUrl, uid, emailVerified;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                    // this value to authenticate with your backend server, if
//                    // you have one. Use User.getToken() instead.
// }
