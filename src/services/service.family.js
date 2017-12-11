(function (){
	angular
    .module('familyService', [])
		.factory('FamilyService', function($http) {

		  var obj = {};
			var serviceBase = 'http://www.mokih.fr/family-server/';
			// Getters
		  obj.getMembersWithFirstname = function(prenom){
		  	var url = serviceBase + 'membersWithFirstname?prenom=' + prenom;
		  	return $http.get(url);
		  };
		  obj.getFamilyMember = function(id, pere, mere){
		  	var url = serviceBase + 'familyMember?id=' + id +'&pere=' + pere + '&mere=' + mere;
		  	return $http.get(url);
		  };
		  obj.getChildren = function(id){
		  	var url = serviceBase + 'children?id=' + id;
		  	return $http.get(url);
		  };
		  obj.getParents = function(pere, mere){
		  	var url = serviceBase + 'parents?pere=' + pere + '&mere=' + mere;
		  	return $http.get(url);
		  };
		  obj.getDetailsNoParents = function(id){
		  	var url = serviceBase + 'detailsNoParents?id=' + id;
		  	return $http.get(url);
		  };
		  // Setters
		  obj.createMember = function() {
		  	var url = serviceBase;
		  	return $http.post(url);
		  }
		return obj;
		});
})();