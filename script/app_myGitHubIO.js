var app = angular.module('myGitHubIOApp',[]);
app.controller('myGitHubIOAppCtrl', ['$scope', function($scope){
    
    $scope.data = {};
    d = $scope.data;
    d.test = 'test value';
    
    
    
    
}]);
app.directive("mainCategoryCard", function() {

var tmplt =  "<div class='col-xs-6 col-sm-4'>";
tmplt += "<div class='thumbnail text-center'>";
tmplt += "<a href='{{href}}'>{{name}}</a>";
tmplt += "</div></div>";
  
  
    return {
        template : tmplt,
        link: function(scope, elem, attrs) {
            scope.href = attrs.href;
            scope.name = attrs.name;
            
            console.log('scope.href: ' + scope.href);
        }
    };
});
