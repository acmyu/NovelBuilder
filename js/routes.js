angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

   .state('tabsController.novel', {
    url: '/novel',
    views: {
      'tab2': {
        templateUrl: 'templates/novel.html',
        controller: 'novelCtrl'
      }
    }
  })

  .state('tabsController.plotBuilder', {
    url: '/plotBuilder',
    views: {
      'tab3': {
        templateUrl: 'templates/plotBuilder.html',
        controller: 'plotBuilderCtrl'
      }
    }
  })

  .state('tabsController.characterBuilder', {
    url: '/characterBuilder',
    views: {
      'tab1': {
        templateUrl: 'templates/characterBuilder.html',
        controller: 'characterBuilderCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabsController',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.worldBuilder', {
    url: '/worldBuilder',
    views: {
      'tab4': {
        templateUrl: 'templates/worldBuilder.html',
        controller: 'worldBuilderCtrl'
      }
    }
  })

  .state('projects', {
    url: '/projects',
    templateUrl: 'templates/projects.html',
    controller: 'projectsCtrl'
  })

  .state('tabsController.oneSentenceDescriptionBuilder', {
    url: '/oneSentenceDescriptionBuilder',
    views: {
      'tab3': {
        templateUrl: 'templates/oneSentenceDescriptionBuilder.html',
        controller: 'oneSentenceDescriptionBuilderCtrl'
      }
    }
  })
  
  .state('tabsController.chapter', {
    url: '/chapter/:chapterId',
    views: {
      'tab2': {
        templateUrl: 'templates/chapter.html',
        controller: 'chapterCtrl'
      }
    }
  })
  
  .state('tabsController.plotNodeEdit', {
    url: '/plotNodeEdit/:nodeId',
    views: {
      'tab3': {
        templateUrl: 'templates/plotNodeEdit.html',
        controller: 'plotNodeEditCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/projects')

  

});