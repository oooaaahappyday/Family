function FamillesController($scope, FamilyService, $http) {
	const familles           = this;
	familles.memberswithname = {};
	familles.siblings        = {};
	familles.member          = {};
	familles.message         = "";
	// console.log(familles.member.prenom);

	familles.memberList = function(){
		// reset message
		familles.message = "";
		// récupère prénom par formulaire
		var prenom = familles.member.prenom;
		// Appel au service pour récupérer la promesse, reponse de la bdd
		FamilyService.getMembersWithFirstname(prenom)
		.then(function(response){
			familles.memberswithname = response.data;
			if (familles.memberswithname.length == 0) {
				return familles.message = "Nous n'avons pas de "+ prenom +" parmi nous!"
			}
			familles.memberswithname.number = familles.memberswithname.length;
			familles.message = 'Il y a '
				+familles.memberswithname.number+' '
				+prenom+' dans la famille.';
			return familles.memberswithname;
		});

	};
	// au clic sur un nom de la liste
	familles.getMember = function(id, pere, mere){
		familles.member = {};
		FamilyService.getFamilyMember(id, pere, mere)
		.then(function (response) {
        familles.siblings = response.data;
    console.log(familles.siblings);
        return familles.siblings;
      }
    );
	};
};

export default FamillesController