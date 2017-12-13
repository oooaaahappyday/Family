function FamillesController($scope, $state, FamilyService, $http, $location, $sanitize ) {
	const familles  	 = this;
	$scope.logged 		 = false;
	$scope.formVisible = true;

	String.prototype.ucfirst = function() {
	    return this.charAt(0).toUpperCase() + this.substr(1);
	}

	familles.appState				 = "";
	familles.message         = "";
	familles.membersWithName = {};// liste member avec prénom recherché
	familles.member          = {};// infos sur membre sélectionné
	familles.parents         = {};// infos sur parents membre sélectionné
	familles.children        = {};// infos sur enfants membre sélectionné

	familles.memberList = function(){
		familles.message = "";
		familles.appState = "";
		// prénom nettoyé d'eventuels caractères spéciaux dangereux
		var prenom = $sanitize(familles.member.prenom);
		FamilyService.getMembersWithFirstname(prenom)
		.then(function(response){
			familles.membersWithName = response.data;
			// Pas de prénom recherché
			if (familles.membersWithName.length == 0) {
				return familles.message = "Nous n'avons pas de "+ prenom +" parmi nous!"
			}
			familles.membersWithName.number = familles.membersWithName.length;
			familles.message = 'Nous avons '
				+familles.membersWithName.number+' '
				+prenom.ucfirst()+' dans la famille.';
			return familles.membersWithName;
		});
	};

	// au clic sur un nom de la liste
	familles.getMember = function(id, pere, mere){

		$scope.formVisible = false;
		familles.message = ""; // reset message
		familles.membersWithName = {};
		familles.member = {};
		familles.appState = "siblings";
		if (id && (!pere || !mere)) { // info membre sans parents enregistrés
			FamilyService.getDetailsNoParents(id)
			.then(function (response) {
				familles.member = {
					'siblings': response.data[0],
					'children': response.data[1]
				};
				return familles.member;
			});
		} else { // infos membre
			FamilyService.getFamilyMember(id, pere, mere)
			.then(function (response) {
				familles.member= {
					'siblings': response.data[0],
					'children': response.data[1],
					'parents' : response.data[2]
				};
	      return familles.member;
    	});
		}
	};

	familles.getChildren = function(id, pere, mere){
		familles.appState	= "siblings"; // réinitialisation pour l'animation
		familles.message = "";
		FamilyService.getChildren(id)
		.then(function (response) {
			familles.children = response.data;
			if (familles.children.length > 0) { // Au moins 1 enfant
				familles.appState	= "children";
				return familles.children;
			} else if (id && (!pere || !mere)) { // pas d'enfants et pas de parents enregistrés
				familles.message = "Pas de parents enregistrés !";
				familles.appState = "siblings";
				FamilyService.getDetailsNoParents(id)
				.then(function (response) {
					familles.member = {
						'siblings': response.data[0],
						'children': response.data[1]
					};
					return familles.member;
				});
			} else { // Pas d'enfants
				familles.message = "Pas d'enfant enregistré !";
				familles.appState	= "siblings";
				FamilyService.getFamilyMember(id, pere, mere)
				.then(function (response) {
					familles.member= {
						'siblings': response.data[0],
						'children': response.data[1],
						'parents' : response.data[2]
					};
		      return familles.member;
	    	});
			}
		});
	};

	familles.getParents = function(id, pere, mere){
		familles.appState = "siblings"; // réinitialisation pour l'animation
		familles.message = "";
		FamilyService.getParents(pere, mere)
		.then(function (response) {
			familles.parents = response.data;
			if (familles.parents.length > 0) { // Au moins 1 parent en base
				familles.appState = "parents";
				return familles.parents;
			} else if (id && (!pere || !mere)) { // Cas pas de parents enregistrés
				familles.message = "Pas de parents enregistrés !";
				familles.appState = "siblings";
				FamilyService.getDetailsNoParents(id)
				.then(function (response) {
					familles.member = {
						'siblings': response.data[0],
						'children': response.data[1]
					};
					return familles.member;
				});
			} else { // exception parents supprimés de base mais toujours en référence
				familles.message = "Pas de parents enregistrés !";
				familles.appState	= "siblings";
				FamilyService.getFamilyMember(id, pere, mere)
				.then(function (response) {
					familles.member= {
						'siblings': response.data[0],
						'children': response.data[1],
						'parents' : response.data[2]
					};
		      return familles.member;
	    	});
			}
		});
	};

	familles.getDetails = function(id, pere, mere){
		// reset message
		familles.details = {};
		familles.message = "";
		familles.appState = "details";
			if (id && (!pere || !mere)) { // info membre sans parents enregistrés
				FamilyService.getDetailsNoParents(id)
				.then(function (response) {
					familles.details = { //récupère membre + enfants
						'member'  : response.data[0][0],
						'children': response.data[1]
					};
					return familles.details;
				});
			} else {
				FamilyService.getFamilyMember(id, pere, mere)
				.then(function (response) {
		     	// cf API
		      familles.details = {
		      	'member'  : response.data[0][0],
		      	'siblings': response.data[0].slice(1), // supprime la personne affichee
		      	'children': response.data[1],
		      	'parents' : {
		      		"pere":response.data[2][0],
			      	"mere":response.data[2][1]
			      }
			    };
			  console.log(familles.details);
	      return familles.details;
	    });
    }
	};
};

export default FamillesController