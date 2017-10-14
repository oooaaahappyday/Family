function FamillesController($scope, FamilyService) {
    const familles = this;

    familles.siblings = {};
    familles.sibling = {};
  	familles.siblings = FamilyService.getSiblings();
    familles.sibling = FamilyService.getSiblingDetails(1)

    // affichage de la fiche de l'utilisateur courant + siblings
    //-> affiche les basics: photo nom prenom
	  //-> fonction qui affiche les fleches vers les enfants si ils existent

    //FICHES
    //fiche famille nucléaire
    familles.showFamilyDetails = function()
    {
    	// affiche le membre principal + conjoint + enfants
    	console.log("siblings");
    }

    //fiche individuelle
		familles.showSiblingDetails = function(id)
		{
			//affiche tous les détails d'une personne
			console.log(familles.sibling.prenom);
		};
}

export default FamillesController

// fonction de glissement vers parents/enfants
