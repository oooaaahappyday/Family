// CSS
import './styles/app.css' // Import du style

// Config
import angular from 'angular'
import '@uirouter/angularjs'
import ngSidebarJS from 'angular-sidebarjs';
import config from './app.config.js'
import 'bootstrap'

//Controllers
import FamillesController from './familles/familles.controller.js'
import HomeController from './home/home.controller.js'

    angular
        .module('myFamilyApp', ['ui.router', 'ngSidebarJS'])
        .config(config)
        .controller('HomeController' , HomeController)
        .controller('FamillesController' , FamillesController);