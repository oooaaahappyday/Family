function FamillesController($scope, FamilyService, $http) {
	const familles           = this;
	familles.appState				 = "";
	familles.message         = "";
	familles.membersWithName = {};// liste member avec prénom recherché
	familles.member          = {};// infos sur membre sélectionné
	familles.parents         = {};// infos sur parents membre sélectionné
	familles.children        = {};// infos sur enfants membre sélectionné

	familles.memberList = function(){
		familles.message = "";
		// familles.siblings = {};
		var prenom = familles.member.prenom;
		FamilyService.getMembersWithFirstname(prenom)
		.then(function(response){
			familles.membersWithName = response.data;
			// Pas de prénom recherhé
			if (familles.membersWithName.length == 0) {
				return familles.message = "Nous n'avons pas de "+ prenom +" parmi nous!"
			}
			familles.membersWithName.number = familles.membersWithName.length;
			familles.message = 'Il y a '
				+familles.membersWithName.number+' '
				+prenom+' dans la famille.';
			return familles.membersWithName;
		});
	};

	// au clic sur un nom de la liste
	familles.getMember = function(id, pere, mere){
		// reset message
		familles.message = "";
		familles.membersWithName = {};
		familles.member = {};
		familles.appState = "siblings";
		// info membre sans parents enregistrés
		if (id && (!pere || !mere)) {
			console.log('hey!');
			FamilyService.getDetailsNoParents(id)
			.then(function (response) {
				familles.member = {
					'siblings': response.data[0],
					'children': response.data[1]
				};
				console.log(familles.member);
				return familles.member;
			});
			// infos membre
		} else {
			FamilyService.getFamilyMember(id, pere, mere)
			.then(function (response) {
				familles.member= {
					'siblings': response.data[0],
					'children': response.data[1],
					'parents' : response.data[2]
				};
				console.log('familles.member : ')
				console.log(familles.member);
	      return familles.member;
    	});
		}
	};

	familles.getChildren = function(id, pere, mere){
		FamilyService.getChildren(id)
		.then(function (response) {
			familles.children = response.data;
			// Exist children
			if (familles.children.length > 0) {
				familles.appState	= "children";
				return familles.children;
			} else {
				// No children
				alert("Pas d'enfant enregistré !");
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
		FamilyService.getParents(pere, mere)
		.then(function (response) {
			familles.parents = response.data;
			if (familles.parents.length > 0) {
				familles.appState = "parents";
				return familles.parents;
				//Cas pas de parents enregistrés
			} else if (id && (!pere || !mere)) {
				alert("Pas de parents enregistrés !");
				console.log('hey Là!');
				familles.appState = "siblings";
				FamilyService.getDetailsNoParents(id)
				.then(function (response) {
					familles.member = {
						'siblings': response.data[0],
						'children': response.data[1]
					};
					console.log(familles.member);
					return familles.member;
				});
			} else {
				// bug, parents enregistré sur fiche mais pas d'entrées en base
				alert("Pas de parents enregistrés !");
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
		FamilyService.getFamilyMember(id, pere, mere)
		.then(function (response) {
      familles.member = response.data[0];
      familles.children = response.data[1];
      familles.parents = {
      	"pere":response.data[2][0],
      	"mere":response.data[2][1],
      };
      familles.details = {
      'member': familles.member[0],
      'children': familles.children,
      'parents' : familles.parents
      };
      return familles.details;
    });
	};
};

export default FamillesController