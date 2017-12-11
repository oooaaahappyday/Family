(function (){
	angular
    .module('firebaseService', [])
		.factory('FirebaseService', function(Auth) {
			var obj = {};
	    obj.email    = "";
	    obj.password = "";

	    obj.message   = null;
	    obj.error     = null;
	    obj.errorCode = null;

	    obj.auth = Auth;

	    // any time auth state changes, add the user data to scope
	    obj.auth.$onAuthStateChanged(function(firebaseUser) {
	      obj.firebaseUser = firebaseUser;
	      console.log('onAuthStateChanged !!');
	    });

	    obj.login = function(){
	    	// log a family member
	    	Auth.$signInWithEmailAndPassword(obj.email, obj.password)
	    	.then(function(firebaseUser) {
	        obj.message = "User logged with uid: " + firebaseUser.uid;
	  			obj.signedInUser = firebaseUser.uid;
	      })
	    	.catch(function(error) {
	    	  obj.error = error;
	    	});
	    };

	    obj.logout = function(){
	      // log a family member
	      Auth.$signOut()
	      .then(function(firebaseUser) {
	        obj.message = "User logged with uid: " + firebaseUser.uid;
	        obj.signedInUser = null;
	      })
	      .catch(function(error) {
	        obj.error = error;
	      });
	    };
		return obj;
		});
})();