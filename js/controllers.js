angular.module('app.controllers', ['ionic', 'ui.router'])


.controller('mainCtrl', ['$scope', '$state', function($scope, $state) {	
	$scope.toHtml = function(str) {
		str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
		return str;
	}
	

	$scope.initNovelData = function(novelId) {
		$scope.novel = {
			title: "My Novel",
			cover: "img/alicecover.jpg",
			genres: ["Fantasy", "Adventure"],
			synopsis: "Synopsis goes here.",
			wordCount: 123,
			chapterCount: 4,
			sentenceVariation: 4.34,
			wordsPerSentence: 12.34,
			wordsPerParagraph: 120.34,
			wordsPerChapter: 1234.56,
			chapters: [
				{
					id: 0,
					title: 'foo2',
					attr: [ 'boo', 'zoo' ]
				},
				{
					id: 1,
					title: 'foo3',
					attr: [ 'boo', 'zoo' ]
				},
				{
					id: 2,
					title: 'foo4',
					attr: [ 'boo', 'zoo' ]
				},
				{
					id: 3,
					title: 'bar',
					attr: [ 'far', 'zar' ]
				}
			]
		};
		
		$scope.flattenedPlotTree = [
			{
				id: 0,
				parentId: -1,
				level: 0,
				showReorder: false,
				type: "oneSentence",
				title: "One Sentence Description",
				body: "This is a one sentence description.",
				childrenId: [1, 2]
			},
			{
				id: 1,
				parentId: 0,
				level: 1,
				showReorder: false,
				type: "conflict",
				title: "Conflict 1",
				body: "This is the first conflict and resolution.",
				childrenId: [3]
			},
			{
				id: 2,
				parentId: 0,
				level: 1,
				showReorder: false,
				type: "conflict",
				title: "Conflict 2",
				body: "This is the second conflict and resolution.",
				childrenId: []
			},
			{
				id: 3,
				parentId: 1,
				level: 2,
				showReorder: false,
				type: "conflict",
				title: "Scene 1",
				body: "This is the first scene in the first conflict and resolution.",
				childrenId: []
			}
		];
		
		
		
		$scope.plotTree = {
			id: -1,
			level: -1,
			children: [
				{	id: 0,
					parentId: -1,
					parentNode: 0,
					level: 0,
					showReorder: false,
					type: "oneSentence",
					title: "One Sentence Description",
					body: "This is a one sentence description.",
					childrenId: [1, 2],
					children: [
						{	id: 1,
							parentId: 0,
							parentNode: 0,
							level: 1,
							showReorder: false,
							type: "conflict",
							title: "Conflict 1",
							body: "This is the first conflict and resolution.",
							childrenId: [3],
							children: [
								{	id: 3,
									parentId: 1,
									parentNode: 0,
									level: 2,
									showReorder: false,
									type: "conflict",
									title: "Scene 1",
									body: "This is the first scene in the first conflict and resolution.",
									childrenId: [],
									children: []
								}
							]
						},
						{	id: 2,
							parentId: 0,
							parentNode: 0,
							level: 1,
							showReorder: false,
							type: "conflict",
							title: "Conflict 2",
							body: "This is the second conflict and resolution.",
							childrenId: [],
							children: []
						}
					]
				}
			]
		};
		
		$scope.initPlotTree = function(node) {
			var i;
			for(i=0; i<node.children.length; i++) {
				node.children[i].bodyHtml = $scope.toHtml(node.children[i].body);
				node.children[i].parentNode = node;
				$scope.initPlotTree(node.children[i]);
			}
		};
		$scope.initPlotTree($scope.plotTree);
		
	};

	$scope.initNovelData(0);
	
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
		$scope.hideTabs = false;
		$scope.editMode = false;
		$scope.showReorder = false;
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

.controller('novelCtrl', function($scope) {		
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
})
   
.controller('plotBuilderCtrl', function($scope) {			
	$scope.addPane = function(node) {
		console.log(node);
	};
	
	$scope.toggleReorder = function(node) {
		node.showReorder=!node.showReorder;
	};
	
	$scope.movePane = function(node, fromIndex, toIndex) {
		//console.log(node.parentNode); console.log(node);
		node.parentNode.children.splice(fromIndex, 1);
		node.parentNode.children.splice(toIndex, 0, node);
	};
})

.controller('plotNodeEditCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$scope.plotNode = $scope.flattenedPlotTree[$stateParams.nodeId];
	
	
	
	$scope.startEditMode();
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
	alert($scope.$parent.plotTree.id);
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
 