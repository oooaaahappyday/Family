function UserController(Auth, $state) {
  const that = this;

  that.email    = "";
  that.password = "";

  that.message   = "";
  that.error     = "";
  that.errorCode = "";

  that.auth = Auth;

  // any time auth state changes, add the user data to scope
  that.auth.$onAuthStateChanged(function(firebaseUser) {
    that.firebaseUser = firebaseUser;
  });

  that.login = function(){
  	Auth.$signInWithEmailAndPassword(that.email, that.password)
  	.then(function(firebaseUser) {
      that.error = ""; // efface les précédents messages d'erreur
      that.message = "User logged with uid: " + firebaseUser.uid;
			that.signedInUser = firebaseUser.uid;
      $state.go('familles');
    })
  	.catch(function(error) {
  	  that.message = "L'email ou le mot de passe n'est pas bon, veuillez réessayer";
  	});
  };

  that.logout = function(){
    Auth.$signOut()
    .then(function(firebaseUser) {
      that.error = "";
      that.signedInUser = null;
    })
    .catch(function(error) {
      that.error = error;
    });
  };
 }
export default UserController