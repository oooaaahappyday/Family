function FamillesController($scope, FamilyService, $http) {
	const familles           = this;
	familles.memberswithname = {};
	familles.siblings        = {};
	familles.member          = {};
	familles.parents         = {};
	familles.children        = {};
	familles.message         = "";
	familles.appState				 = "";

	familles.memberList = function(){
		familles.message = "";
		familles.siblings = {};
		var prenom = familles.member.prenom;
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
		// reset message
		familles.message = "";
		familles.memberswithname = {};
		familles.member = {};
		familles.appState = "siblings";
		FamilyService.getFamilyMember(id, pere, mere)
		.then(function (response) {
        familles.siblings = response.data[0];
        familles.children = response.data[1];
        familles.parents = response.data[2];
        return [familles.siblings, familles.children, familles.parents];
      }
    );
	};

	familles.getChildren = function(id){
		familles.appState	= "children";
		FamilyService.getChildren(id)
		.then(function (response) {
			familles.children = response.data;
			console.log(familles.children);
			return familles.children;
		});
	};

	familles.getParents = function(pere, mere){
		familles.appState = "parents";
		FamilyService.getParents(pere, mere)
		.then(function (response) {
			familles.parents = response.data;
			console.log(familles.parents);
			return familles.parents;
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
      // familles.details['member'] = familles.member[0];
      console.log(familles.details['member']);
      console.log(familles.details['children']);
      console.log(familles.details['parents']);
      return familles.details;
    });
	};
};

export default FamillesController