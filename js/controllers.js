angular.module('app.controllers', ['ionic', 'ui.router'])


.controller('mainCtrl', ['$scope', '$state', '$ionicHistory', 'novelData', 'flattenedPlotTreeData', function($scope, $state, $ionicHistory, novelData, flattenedPlotTreeData) {		
	$scope.novelId = 0;

	$scope.initNovelData = function() {
		novelData.set($scope.novelId);
		flattenedPlotTreeData.set($scope.novelId);		
	};
	$scope.initNovelData();

	$scope.hideTabs = false;
	$scope.editMode = false;
	$scope.showReorder = false;
	$scope.setHideTabs = function(value) {
		$scope.hideTabs = value;
	}
	$scope.setShowReorder = function(value) {
		$scope.showReorder = value;
	}
	$scope.setEditMode = function(value) {
		$scope.editMode = value;
	}
	
	$scope.startEditMode = function() {
		$scope.hideTabs = true;
		$scope.editMode = true;
		$scope.showReorder = true;
	}
	$scope.endEditMode = function() {
		if($ionicHistory.backView().stateName!='tabsController.plotNodeEdit'){
			$scope.hideTabs = false;
		}
		$scope.editMode = false;
		$scope.showReorder = false;
	}

	$scope.toHtml = function(str) {
		str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
		return str;
	}
	
	$scope.findByProperty = function(arr, property, val) {
		var i;
		for(i = 0; i < arr.length; i++) {
			if(arr[i][property] == val) {
				return i;
			}
		}
		return -1;
	}
}])

.controller('novelCtrl', ['$scope', 'novelData', function($scope, novelData) {		
	$scope.novel = novelData.get();

	$scope.genreOptions = [
		"Fantasy", 
		"Action",
		"Romance",
		"Adventure"
	];
	
	$scope.saveChanges = function() {
		$scope.endEditMode();
		//write to db
		
	}
	
	$scope.editNovelText = function(editedText, key) {
		$scope.novel[key] = editedText;
	}
	$scope.selectGenre = function(selectedGenre, prevGenre) {
		$scope.novel.genres[$scope.novel.genres.indexOf(prevGenre)] = selectedGenre;
	}
	
	$scope.moveChapter = function(item, fromIndex, toIndex) {
		$scope.novel.chapters.splice(fromIndex, 1);
		$scope.novel.chapters.splice(toIndex, 0, item);
	};

	$scope.onChapterDelete = function(item) {
		$scope.novel.chapters.splice($scope.novel.chapters.indexOf(item), 1);
	};
	
	$scope.addChapter = function() {
		
	};
}])
   
.controller('plotBuilderCtrl', function($scope) {			

})

.controller('plotNodeEditCtrl', ['$scope', '$stateParams', 'flattenedPlotTreeData', function($scope, $stateParams, flattenedPlotTreeData) {
	$scope.flattenedPlotTree = flattenedPlotTreeData.get();
	$scope.plotNode = $scope.flattenedPlotTree[$stateParams.nodeId];
	
	$scope.startEditMode();
	$scope.showReorder = false;	
	
	$scope.addChild = function() {

	};
	
	$scope.startReorder = function() {
		$scope.showReorder=true;
	};
	$scope.endReorder = function() {
		$scope.showReorder=false;
	};
	
	$scope.moveChild = function(childId, fromIndex, toIndex) {
		$scope.plotNode.childrenId.splice(fromIndex, 1);
		$scope.plotNode.childrenId.splice(toIndex, 0, childId);
	};
	
}])
   
.controller('characterBuilderCtrl', function($scope) {

})
         
.controller('worldBuilderCtrl', function($scope) {
	$scope.locations =  [
      {    name: 'Europe',
			level: 0,
          children: [
              {    name: 'Italy',
					level: 1,
                  children: [
                      {    name: 'Rome',
							level: 2},
                      {    name: 'Milan', level: 2    }
                  ]},
              {    name: 'Spain', level: 1}
          ]
      },
      {    name: 'South America', level: 0,
          children: [
              {    name: 'Brasil', level: 1   },
              {    name: 'Peru', level: 1 }
          ]
      }
  ];
})
   
.controller('projectsCtrl', function($scope) {

})
   
.controller('oneSentenceDescriptionBuilderCtrl', function($scope) {
	
})

.controller('chapterCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$scope.setHideTabs(true);

	alert($stateParams.chapterId);
	
	$scope.chapter = {
		title: "My Chapter",
		body: "Once upon a time..."
	}
	
	$scope.saveChanges = function() {
		$scope.endEditMode();
		//write to db
		
	}
	
	$scope.editChapterText = function(editedText, key) {
		$scope.chapter[key] = editedText;
	}
	
	$scope.editChapterBody = function(editedText) {
		$scope.chapter.body = editedText;
	}
}])
 