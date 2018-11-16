angular.module('components', []).
directive('tabs', function() {
    // タブの処理
    return {
        restrict: 'E',  // A:属性, E:要素, AE: 属性または要素
        transclude: true, // directive要素の内容をテンプレートで利用
        scope: {},
        controller: function($scope, $element) {
            let panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function(pane) {
                if(panes.length == 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            }
        },
        template:  '<div class="tabbable">' +
                        '<ul class="nav nav-tabs">' +
                            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                                '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
                            '</li>' +
                        '</ul>' +
                        '<div class="tab-content" ng-transclude></div>' +
                    '</div>',
        replace: true // templateまたはtemplateUrlで指定されたViewをdirective要素の内側に追加
    };
}).
directive('pane', function() {
    // パネルの処理
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
        replace: true
    };
});