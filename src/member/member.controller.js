function MemberController($scope,$stateParams, $state, FamilyService, Upload, $timeout, $sanitize, member) {

	var memberID = ($stateParams.memberID) ? parseInt($stateParams.memberID) : 0;
  $scope.buttonText = (memberID > 0) ? 'Update Member' : 'Add New Member';
  var original = {};
  original._id = memberID;
  $scope.member = angular.copy(original);
  $scope.member._id = memberID;

  // récupère les membres par sexe
  $scope.getGenres = function(){
  	FamilyService.getGenres()
  	.then(function (response){
  		$scope.members ={
  			'femmes': response.data[0],
  			'hommes': response.data[1]
  		};
  	return $scope.members;
  	});
  };
  // Pour peupler les selects des parents
  $scope.members = $scope.getGenres();

  $scope.isClean = function() {
    return angular.equals(original, $scope.member);
  }


  $scope.deleteMember = function(member) {
    $state.go('familles');
    if(confirm("Are you sure to delete member number: "+$scope.member._id)==true)
    services.deleteMember(member.memberNumber);
  };

  $scope.saveMember = function(file, member) {
  console.log(member);
  var myMember = member;
  var key = "$resolve";
  delete myMember[key];
  console.log($scope.myMember);

  console.log(myMember);
    $state.go('familles');
    console.log(member);
    if (memberID <= 0) {
        file.upload = Upload.upload({
    		  url: 'http://www.mokih.fr/family-server/img',
    		  data: {file: file}
    		});
    		file.upload
    		.then(function (response) {
    	  	$timeout(function () {
    	    	file.result = response.data;
    		  });
    		}, function (response) {
    		  if (response.status > 0)
    	  	  $scope.errorMsg = response.status + ': ' + response.data;
    		}, function (evt) {
    		  // Math.min is to fix IE which reports 200% sometimes
    	  	file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    		});
    		// FamilyService.createMember(photo, prenom, nom, date, email, tel, adresse, pere, mere, conjoint, genre)
    		FamilyService.insertMember(myMember)

  			.then(function (response) {
  				console.log(response);
  			});
  			return $scope.myMember;
    	}
  };
};
export default MemberController;

