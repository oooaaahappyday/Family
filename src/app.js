import './styles/app.css' // Import du style

import angular from 'angular'
import '@uirouter/angularjs'
import config from './app.config.js'
//Controllers
import FamillesController from './familles/familles.controller.js'
import HomeController from './home/home.controller.js'

    angular
        .module('myFamilyApp', ['ui.router'])
        .config(config)
        .controller('HomeController' , HomeController)
        .controller('FamillesController' , FamillesController);