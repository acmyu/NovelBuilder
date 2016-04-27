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
          children: '='
      },
      template: "<plot-child-node ng-repeat='node in children' node='node'></plot-child-node>"
  }
})

.directive('plotChildNode', function ($compile) {
  return {
      restrict: "E",
      replace: true,
      scope: {
          node: '='
      },
      template: "<div></div>",
      link: function (scope, element, attrs) {
		  scope.paneOpen = false;
		  scope.togglePane = function() { 
			scope.paneOpen = !scope.paneOpen;
		  }
		  
          if (angular.isArray(scope.node.children)) {
			  var content = "<v-pane ng-disabled='node.children.length==0'>" +
								"<v-pane-header>" +
									"<plot-node-content></plot-node-content>" +
								"</v-pane-header>" +
									(scope.node.children.length==0 ? 
										"<v-pane-content></v-pane-content>" : 
										"<v-pane-content><v-accordion>" +
											"<plot-children children='node.children'></plot-children>" +
										"</v-accordion></v-pane-content>"
									) +
							"</v-pane>";
              element.append(content);
              $compile(element.contents())(scope)
          }
		  
		  
		  scope.addPane = function(currNode) {
			  scope.$parent.addPane(currNode);
		  };
		  scope.toggleReorder = function(currNode) {
			  scope.$parent.toggleReorder(currNode);
		  };
		  scope.movePane = function(node, fromIndex, toIndex) {
			  scope.$parent.movePane(node, fromIndex, toIndex);
		  };
      }
  }
})

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
	  template: "<div><button class='button button-clear' ng-click='addPane(node)'> <i class='icon ion-plus'></i> </button>" +
				"<button class='button button-clear' ng-hide='node.children.length==0'> Select</button>" + 
				"<button class='button button-clear' ng-hide='node.children.length==0' ng-click='$accordion.collapseAll(); toggleReorder(node)'> Reorder </button></div>"
  }
})