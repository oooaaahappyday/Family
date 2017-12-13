function config($stateProvider, $locationProvider, $urlRouterProvider,$sceDelegateProvider) {
    //Supprime le préfixe "!" des URLs
    $locationProvider.hashPrefix('')

    // Urls de confiance
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://www.mokih.fr/**'
    ]);

    /**
     * Configuration des routes de l'application
     */

    $stateProvider
        .state({
          name        : 'home',
          url         : '/',
          templateUrl : 'src/home/home.view.html',
          controller  : 'HomeController',
          controllerAs: 'home'
        })
        .state({
          name        : 'user',
          url         : '/user',
          templateUrl : 'src/user/user.view.html',
          controller  : 'UserController',
          controllerAs: 'user'
        })
        .state({
          name        : 'familles',
          url         : '/familles',
          templateUrl : 'src/familles/familles.view.html',
          controller  : 'FamillesController',
          controllerAs: 'familles'
        })
        .state({
            name        : 'member',
            url         : '/member/:memberID',
            templateUrl : 'src/member/member.view.html',
            controller  : 'MemberController',
            controllerAs: 'member',
            resolve: {
              member: function(FamilyService, $stateParams){
                var memberID = $stateParams.memberID;
                console.log(memberID);
                var test = FamilyService.getMember(memberID);
                console.log(test);
                return FamilyService.getMember(memberID);
              }
            }
        })

    // Si aucune route n'est atteinte, on charge par defaut celle-ci
    $urlRouterProvider.otherwise('/')
}

// Nomme explicitement les injections de dépendances (pour éviter les bugs lors de la minification)
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider','$sceDelegateProvider']

// Export de la fonction de configuration
export default config
