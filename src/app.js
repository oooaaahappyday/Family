// CSS
import './styles/app.css' // Import du style

// Config
import angular 					from 'angular'
import '@uirouter/angularjs'
import ngSidebarJS 				from 'angular-sidebarjs'
import config 					from './app.config.js'
// Tools
import ngAnimate 				from 'angular-animate'
import ngSanitize 				from 'angular-sanitize'
import ngFileUpload 			from 'ng-file-upload'

// Services
import familyService 			from './services/service.family.js'

// Directives

//Controllers
import HomeController 			from './home/home.controller.js'
import FamillesController 		from './familles/familles.controller.js'
import MemberController 		from './member/member.controller.js'

(function(){
	"use strict";
    var app = angular
        .module('myFamilyApp', ['ui.router', 'ngSanitize', 'familyService', 'ngAnimate', 'ngSidebarJS', 'ngFileUpload'])
        .config(config)
        .controller('HomeController', 		HomeController)
        .controller('FamillesController', 	FamillesController)
        .controller('MemberController', 	MemberController)
})();