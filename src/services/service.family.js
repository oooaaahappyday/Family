(function (){
	angular
    .module('familyService', [])
		.factory('FamilyService', function($http) {

			var serviceBase = 'http://www.mokih.fr/family-server/';
			var obj = {};
			// Methodes de tri bdd pour affichage infos relations membres de la famille
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
			obj.getGenres = function() {
				var url = serviceBase + 'genres';
				return $http.get(url);
			};

			// CRUD gestion des entité member
			obj.getMembers = function(){
				return $http.get(serviceBase + 'members');
			}
			obj.getMember = function(memberID){
				return $http.get(serviceBase + 'member?id=' + memberID);
			}
			obj.insertMember = function (member) {
				return $http.post(serviceBase + 'insertMember', member)
				.then(function (results) {
					return results;
				});
			};
			obj.updateMember = function (id,member) {
				return $http.post(serviceBase + 'updateMember', {id:id, member:member}).then(function (status) {
					return status.data;
				});
			};
			obj.deleteMember = function (id) {
				return $http.delete(serviceBase + 'deleteMember?id=' + id).then(function (status) {
					return status.data;
				});
			};
			return obj;
		});
})();