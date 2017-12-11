// CSS
import './styles/app.css' // Import du style

// Config
import angular 						from 'angular'
import angularfire 				from 'angularfire'
import '@uirouter/angularjs'
import ngSidebarJS 				from 'angular-sidebarjs'
import config 						from './app.config.js'
import ngAnimate 					from 'angular-animate';
import ngSanitize 				from 'angular-sanitize';
// import 'bootstrap'

// Services
import familyService 			from './services/service.family.js'
import firebaseService 		from './services/service.firebase.js'

//Controllers
import HomeController 		from './home/home.controller.js'
import UserController 		from './user/user.controller.js'
import FamillesController from './familles/familles.controller.js'
import MemberController 	from './member/member.controller.js'

(function(){
	"use strict";
    var app = angular
        .module('myFamilyApp', ['firebase','ui.router', 'ngSanitize', 'familyService', 'firebaseService', 'ngAnimate', 'ngSidebarJS'])
        .run(["$rootScope", "$state", function($rootScope, $state) {
          $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
              $state.go("/user");
            }
          });
        }])
        .config(config)
        .factory("Auth", ["$firebaseAuth",
          function($firebaseAuth) {
            return $firebaseAuth();
        }])
        .controller('HomeController', 		HomeController)
        .controller('UserController', 		UserController)
        .controller('FamillesController', FamillesController)
        .controller('MemberController', 	MemberController)
})();