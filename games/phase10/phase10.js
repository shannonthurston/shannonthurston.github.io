 var app = angular.module('PhaseTenApp', []);
app.controller('PhaseTenAppCtrl', function($scope){

    $scope.result_round_1 = 0;
    $scope.round_one_bonus = 0;
    $scope.result_round_2 = 0;
    $scope.result_final = 0;
    $scope.finished_first_bonus = 0;
    
    
    $scope.updateRound1Total = function(){
        var p1 = $scope.phase_1 || 0;
        var p2 = $scope.phase_2 || 0;
        var p3 = $scope.phase_3 || 0;
        var p4 = $scope.phase_4 || 0;
        var p5 = $scope.phase_5 || 0;
        
        var round1Total = (p1 + p2 + p3 + p4 + p5);
        if(round1Total >= 220){
           $scope.round_one_bonus = 40; 
        }
        $scope.result_round_1 = round1Total;
    };
    
    $scope.updateRound2Total = function(){
        var p6 = $scope.phase_6 || 0;
        var p7 = $scope.phase_7 || 0;
        var p8 = $scope.phase_8 || 0;
        var p9 = $scope.phase_9 || 0;
        var p10 = $scope.phase_10 || 0;
        
        var round2Total = (p6 + p7 + p8 + p9 + p10);
        $scope.result_round_2 = round2Total;
    };
    
    $scope.updateFinalResults = function(){
        $scope.result_final = ($scope.result_round_1 + $scope.result_round_2 + $scope.round_one_bonus + $scope.finished_first_bonus);
    }
  
    $scope.updateTotals = function(){
        console.log('updating totals');
        $scope.updateRound1Total();
        $scope.updateRound2Total();
        $scope.updateFinalResults();
    }
    
    $scope.finishedFirstBonus = function(){
        $scope.finished_first_bonus = 40;
        $scope.updateTotals();
    }
    
    $scope.clearFinishedFirstBonus = function(){
         $scope.finished_first_bonus = 0;
        $scope.updateTotals();
    }
    
    
    
    $scope.updateTotals();
    
});
