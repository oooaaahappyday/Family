function MemberController($stateParams,FamilyService) {
	const member    = this;
	member.message  = "";
	member.indiv    = {};
	member.indiv.id = $stateParams.id; //id récupéré par url
	member.indiv.pere = $stateParams.pere; //pere récupéré par url
	member.indiv.mere = $stateParams.mere; //mere récupéré par url
	console.log(member.indiv);
	member.siblings = {};

	member.details  = FamilyService.getFamilyMember(member.indiv.id,member.indiv.pere,member.indiv.mere)
	.then(function(response){
		member.indiv  = response.data;
		if (member.indiv == 0) {
			member.message = "Ooops cette personne n'est pas joignable pour le moment!";
		}
		return member.indiv;
	});
}
export default MemberController;