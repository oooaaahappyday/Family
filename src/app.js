// CSS
import './styles/app.css' // Import du style

// Config
import angular from 'angular'
import '@uirouter/angularjs'
import ngSidebarJS from 'angular-sidebarjs'
import config from './app.config.js'
// import 'bootstrap'

// Services
import familyService from './services/service.family.js'

//Controllers
import HomeController from './home/home.controller.js'
import FamillesController from './familles/familles.controller.js'
import DetailsController from './familles/details/details.controller.js'
import EvenementsController from './evenements/evenements.controller.js'
import BlogController from './blog/blog.controller.js'
import PhotosController from './photos/photos.controller.js'
import AboutController from './about/about.controller.js'
(function(){
	"use strict";
    var app = angular
        .module('myFamilyApp', ['ui.router', 'ngSidebarJS', 'familyService'])
        .config(config)
        .controller('HomeController' , HomeController)
        .controller('FamillesController' , FamillesController)
        .controller('DetailsController' , DetailsController)
        .controller('EvenementsController' , EvenementsController)
        .controller('BlogController' , BlogController)
        .controller('PhotosController' , PhotosController)
        .controller('AboutController' , AboutController);
})();