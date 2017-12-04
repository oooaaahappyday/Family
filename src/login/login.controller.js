function LoginController(firebase) {
  const that = this;

  that.email    = "";
  that.password = "";
  that.message  = "";

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      window.location = '#/familles'; //After successful login, user will be redirected to home.html
    }
  });

  that.register = function(){
  	firebase.auth().createUserWithEmailAndPassword(that.email, that.password)
  	.catch(function(error) {
  	  var errorCode = error.code;
  	  that.message  = error.message;
  	});
  	console.log("Vous êtes inscrit! Veuillez maintenant vous authentifier afin de pouvoir modifier vos informations personnelles.");
  };
  that.login = function(){
  	firebase.auth().signInWithEmailAndPassword(that.email, that.password)
  	.catch(function(error) {
  	  var errorCode = error.code;
  	  that.message  = error.message;
  	  console.log(error.message);
  	});
  	console.log("Vous êtes authentifié");
  };
  that.logout = function(){
  	firebase.auth().signOut().then(function() {
  	  that.message = "bye bye!";
  	}).catch(function(error) {
  	  that.message = error.message;
  	});
  };
 }
export default LoginController