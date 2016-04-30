angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('databaseManager', [function() {
	var db;
	function openDB() {
		db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'}, 
		function() {
			alert("OPEN success");
		}, 
		function(error) {
			alert('OPEN error');
		});
	}
	function initDB() {
		db.sqlBatch([
		  'CREATE TABLE IF NOT EXISTS MyTable (SampleColumn)',
		  'CREATE TABLE IF NOT EXISTS MyTable2 (SampleColumn)',
		  'CREATE TABLE IF NOT EXISTS MyTable3 (SampleColumn)',
		], function() {
			alert('CREATE success');
		}, function(error) {
			alert('CREATE error: ' + error.message);
		});
		
		var firstrun = window.localStorage.getItem("firstrunDB");
		if ( firstrun == null ) {
			window.localStorage.setItem("firstrunDB", "1");
			alert("firstrun");
		}
		else {
			alert("not firstrun");
		}

	}
	function resetDB() {
		db.sqlBatch([
		  'DROP TABLE IF EXISTS MyTable',
		  'DROP TABLE IF EXISTS MyTable2',
		  'DROP TABLE IF EXISTS MyTable3',
		], function() {
			alert('DROP success');
		}, function(error) {
			alert('DROP error: ' + error.message);
		});
		
		window.localStorage.removeItem("firstrunDB");
	}

	return {
		openDB: openDB,
		initDB: initDB,
		resetDB: resetDB
	}

}])


.factory('novelData', [function() {
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

}])


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
	function getNode(id) {
		return flattenedPlotTree[id];
	}
	
	return {
		set: set,
		get: get,
		getNode: getNode
	}

})



