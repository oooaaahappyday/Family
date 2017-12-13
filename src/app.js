// CSS
import './styles/app.css' // Import du style

// Config
import angular 						from 'angular'
// import angularfire 				from 'angularfire'
import '@uirouter/angularjs'
import ngSidebarJS 				from 'angular-sidebarjs'
import config 						from './app.config.js'
// Tools
import ngAnimate 					from 'angular-animate'
import ngSanitize 				from 'angular-sanitize'
import ngFileUpload 			from 'ng-file-upload'
import toaster						from './js/toaster.js'

// Services
import familyService 			from './services/service.family.js'
import authService 				from './services/service.auth.js'

// Directives
import authDirectives 		from './directives/directives.js'

//Controllers
import HomeController 		from './home/home.controller.js'
import UserController 		from './user/user.controller.js'
import FamillesController from './familles/familles.controller.js'
import MemberController 	from './member/member.controller.js'
import LoginController 		from './login/login.controller.js'

(function(){
	"use strict";
    var app = angular
        .module('myFamilyApp', ['ui.router', 'ngSanitize', 'authService', 'authDirectives', 'familyService', 'ngAnimate', 'ngSidebarJS', 'toaster', 'ngFileUpload'])
        .config(config)
       //  app.run(function($rootScope,$state, $transitions, Data) {
       //    $transitions.onStart({ to: 'familles' }, function(trans) {
       //      $rootScope.authenticated = false;
       //      Data.get('session').then(function (results) {
       //      	console.log(results);
       //        if (results.uid) {
       //          $rootScope.authenticated = true;
       //          $rootScope.uid = results.uid;
       //          $rootScope.name = results.name;
       //          $rootScope.email = results.email;
       //        } else {
							// 	$state.go("login");
       //    		}
      	// 		});
       //  	})
      	// })
        .controller('HomeController', 		HomeController)
        // .controller('UserController', 		UserController)
        .controller('FamillesController', FamillesController)
        .controller('MemberController', 	MemberController)
        .controller('LoginController', 	LoginController)
})();