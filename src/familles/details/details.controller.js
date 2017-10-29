function DetailsController($scope, $stateParams, FamilyService) {
	const details = this;
	details.id = $stateParams.id; //id récupéré par url
	details.siblings = {};
	details.sibling = {};
	details.siblings = FamilyService.getSiblings();
	details.sibling = FamilyService.getSiblingDetails(details.id);
	// console.log(details.id);
	// console.log(details.sibling.prenom);

}

export default DetailsController