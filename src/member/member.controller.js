function MemberController($stateParams,FamilyService) {
	const member    = this;
	member.message  = "";
	member.indiv    = {};
	member.indiv.id = $stateParams.id; //id récupéré par url
	member.siblings = {};
	console.log(member.indiv.id);

	member.details  = FamilyService.getFamilyMember(member.indiv.id)
	.then(function(response){
		member.indiv  = response.data;
		console.log(member.indiv);
		if (member.indiv == 0) {
			member.message = "Ooops cette personne n'est pas joignable pour le moment!";
		}
		return member.indiv;
	});
}
export default MemberController;