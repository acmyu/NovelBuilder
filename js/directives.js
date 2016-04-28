angular.module('app.directives', [])

.directive('homeButton', [function(){
	return {
		template : "<button class='button button-clear' ui-sref='projects' ng-hide='editMode'> <i class='icon ion-home'></i> </button>"
    };
}])

.directive('editButton', [function(){
	return {
		template : "<button id='button-startEdit' class='button button-clear no-transition icon ion-edit' ng-click='startEditMode()' ng-hide='editMode'></button>"
    };
}])

.directive('doneButton', [function(){
	return {
		template : "<button id='button-endEdit' class='button button-clear no-transition' ng-click='saveChanges()' ng-show='editMode'>Done</button>"
    };
}])


.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    if(element[0].scrollHeight != 0) {
						element[0].style.height = "" + (element[0].scrollHeight+10) + "px";
					}
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }
])



.directive('plotChildren', function () {
  return {
      restrict: "E",
      replace: true,
      scope: {
          childrenid: '='
      },
      template: "<plot-child-node ng-repeat='nodeid in childrenid' nodeid='nodeid'></plot-child-node>"
  }
})

.directive('plotChildNode', ['$compile', 'flattenedPlotTreeData', function ($compile, flattenedPlotTreeData) {
  return {
      restrict: "E",
      replace: true,
      scope: {
          nodeid: '='
      },
      template: "<div></div>",
      link: function (scope, element, attrs) {		  
		  var flattenedPlotTree = flattenedPlotTreeData.get();
		  scope.node = flattenedPlotTree[scope.nodeid];
		  
          if (angular.isArray(scope.node.childrenId)) {
			  var content = "<v-pane>" +
								"<v-pane-header>" +
									"<plot-node-content></plot-node-content>" +
								"</v-pane-header>" +
									(scope.node.childrenId.length==0 ? 
										"<v-pane-content></v-pane-content>" : 
										"<v-pane-content><v-accordion>" +
											"<plot-children childrenid='node.childrenId'></plot-children>" +
										"</v-accordion></v-pane-content>"
									) +
							"</v-pane>";
              element.append(content);
              $compile(element.contents())(scope)
          }
      }
  }
}])

.directive('plotNodeContent', function ($compile) {
  return {
	  templateUrl: 'templates/directiveTemplates/plotNodeContent.html',
  }
})

.directive('vPaneHeader', function () {
  return {
    restrict: 'E',
    priority: 1,
    link: function (scope, iElement) {
      iElement.off('keydown');
    }
  }
})

.directive('paneButtons', function () {
  return {
	  template: "<div><button class='button button-clear' ng-click='addChild()'> <i class='icon ion-plus'></i> </button>" +
				"<button class='button button-clear'> Select</button>" + 
				"<button class='button button-clear' ng-click='toggleReorder()'> Reorder </button></div>"
  }
})