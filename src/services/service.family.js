(function (){
	angular
    .module('familyService', [])
		.factory('FamilyService', function() {
			var siblings = {
			1 :	{
					id: 1,
					nom: 'Dupuis',
					prenom: 'Joseph',
					date: '17/12/1982',
					age: 35,
					tel: '0102030405',
					mail: 'josephdupuis@gmail.com',
					addresse: '12 Grande Rue 75000 Paris',
					parents:
					{
						dad:
						{
							nom: 'Dupuis',
							prenom: 'Gérard',
							date: '11/03/1960'
						},
						mum:
						{
							nom: 'Dupuis',
							prenom: 'Léa',
							date: '01/07/1962'
						}
					},
					enfants:
					{
						emma:
						{
							nom:'Dupuis',
							prenom: 'Emma',
							date: '23/10/2016'
						},
						edwidge:
						{
							nom: 'Dupuis',
							prenom: 'Edwidge',
							date: '02/08/2017'
						}
					}
				},
			2 :	{
					id: 2,
					nom: 'Dupuis',
					prenom: 'Léa',
					date: '17/12/1983',
					age: 34,
					tel: '0102030405',
					mail: 'leadupuis@gmail.com',
					addresse: '12 Grande Rue 75000 Paris',
					parents:
					{
						dad:
						{
							nom   : 'Dupuis',
							prenom: 'Gérard',
							date  : '11/03/1960'
						},
						mum:
						{
							nom   : 'Dupuis',
							prenom: 'Maëlle',
							date  : '01/07/1962'
						}
					},
					enfants:
					{
						emma:
						{
							nom   :'Dupuis',
							prenom: 'Emma',
							date  : '23/10/2005'
						},
						edwidge:
						{
							nom   : 'Dupuis',
							prenom: 'Edwidge',
							date  : '02/08/2010'
						}
					}
				},
			3 :	{
					id: 3,
					nom: 'Dupuis',
					prenom: 'Hugo',
					date: '17/12/1986',
					age: 31,
					tel: '0102030405',
					mail: 'hugodupuis@gmail.com',
					addresse: '12 Grande Rue 75000 Paris',
					parents:
					{
						dad:
						{
							nom   : 'Dupuis',
							prenom: 'Gérard',
							date  : '11/03/1960'
						},
						mum:
						{
							nom   : 'Dupuis',
							prenom: 'Léa',
							date  : '01/07/1962'
						}
					},
					enfants: {}
				}
			};
			return {
				getSiblings: function ()
				{
					return siblings;
				},
				getSiblingDetails: function(id)
				{
					return siblings[id];
				}
			}
		});
})();