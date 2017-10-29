(function (){
	angular
    .module('familyService', [])
		.factory('FamilyService', function($http) {

			var serviceBase = 'http://www.mokih.fr/family-server/';
		  var obj = {};

		  obj.getMembersWithFirstname = function(prenom){
		  	var url = serviceBase + 'membersWithFirstname?prenom=' + prenom;
		  	return $http.get(url);
		  };

		  obj.getSiblings = function(){
		  	var url = serviceBase + 'siblings';
        return $http.get(url);
      };

		  obj.getFamilyMember = function(id){
		  	var url = serviceBase + 'familyMember?id=' + id;
		  	// var records = {};
		  	return $http.get(url);
	    	// return $http.jsonp(url)
	    	// 	.then(function(data){
		  		// 	console.log('toto');
		  		// 	console.log(data.data.result.prenom);
		  		// });
		  };
		return obj;
		});
})();