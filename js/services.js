angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('novelData', function() {
	var novel = {};
	function set(novelId) {
		novel = {
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
	}
	function get() {
		return novel;
	}

	return {
		set: set,
		get: get
	}

})


.factory('flattenedPlotTreeData', function() {
	function toHtml(str) {
		str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
		return str;
	}
	
	var flattenedPlotTree = {};
	function set(novelId) {
		flattenedPlotTree = [
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
		
		for(var i=0; i<flattenedPlotTree.length; i++) {
			flattenedPlotTree[i].bodyHtml = toHtml(flattenedPlotTree[i].body);
		}
	}
	function get() {
		return flattenedPlotTree;
	}

	return {
		set: set,
		get: get
	}

})



