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

    $scope.appsObj.tic_tac_toe = {
            name: "Tic Tac Toe",
            href: "./games/tic-tac-toe/tic-tac-toe.html"
        }

    $scope.appsObj.code_playground = {
            name: "Code Playground",
            href: "./utilities/codePlayground/codePlayground.html"
        }

    $scope.appsObj.audio_visualizer = {
            name: "Audio Visualizer",
            href: "./apps/audioVisualizer/audio.html"
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




