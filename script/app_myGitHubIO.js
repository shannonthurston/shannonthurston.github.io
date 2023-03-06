var app = angular.module('myGitHubIOApp',[]);
app.controller('myGitHubIOAppCtrl', ['$scope', function($scope){

   let MC = this;
    
    $scope.data = {};
    let d = $scope.data;
    d.year = new Date().getFullYear();    
    

    $scope.appsObj = {};

    $scope.appsObj.phase_10 = {
            name: "Phase 10",
            href: "./games/phase10/phase10.html"
        }

    $scope.appsObj.phase_10 = {
            name: "Tic Tac Toe",
            href: "./games/ttt/ticTacToe.html"
        }

    $scope.appsObj.google = {
            name: "Google",
            href: "https://www.google.com"
        }
    

}]);

app.directive("mainCategoryCard", function() {
  
    return {
        templateUrl: "templates/app_link.html",
        scope: {
            app : '=info'
        }
        
    };
});




