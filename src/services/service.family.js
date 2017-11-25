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

		  obj.getFamilyMember = function(id, pere, mere){
		  	var url = serviceBase + 'familyMember?id=' + id +'&pere=' + pere + '&mere=' + mere;
		  	return $http.get(url);
		  };
		return obj;
		});
})();