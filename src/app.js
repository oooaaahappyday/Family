// CSS
import './styles/app.css' // Import du style

// Config
import angular 						from 'angular'
import angularfire 				from 'angularfire'
import '@uirouter/angularjs'
import ngSidebarJS 				from 'angular-sidebarjs'
import config 						from './app.config.js'
// import 'bootstrap'

// Services
import familyService 			from './services/service.family.js'

//Controllers
import HomeController 		from './home/home.controller.js'
import LoginController 		from './login/login.controller.js'
import FamillesController from './familles/familles.controller.js'

(function(){
	"use strict";
    var app = angular
        .module('myFamilyApp', ['firebase','ui.router', 'ngSidebarJS', 'familyService'])
        .config(config)
        .controller('HomeController' , HomeController)
        .controller('LoginController' , LoginController)
        .controller('FamillesController' , FamillesController)
})();