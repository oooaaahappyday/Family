function config($stateProvider, $locationProvider, $urlRouterProvider,$sceDelegateProvider) {
    /*
        Supprime le préfixe "!" des URLs, présent par défaut dans Angular 1.6.* (voir http://stackoverflow.com/questions/41226122/url-hash-bang-prefix-instead-of-simple-hash-in-angular-1-6)
        Au lieu de qqch comme   http://localhost:8080/#!/home ,
        on aurait plutôt  http://localhost:8080/#/home (ce qui est plus propre)
    */

    $locationProvider.hashPrefix('')
    // Whitelisted url
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
            name        : 'familles',
            url         : '/familles',
            templateUrl : 'src/familles/familles.view.html',
            controller  : 'FamillesController',
            controllerAs: 'familles'
        })

    // Si aucune route n'est atteinte, on charge par defaut celle-ci
    $urlRouterProvider.otherwise('/')
}

// Nomme explicitement les injections de dépendances (pour éviter les bugs lors de la minification)
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider','$sceDelegateProvider']

// Export de la fonction de configuration
export default config
