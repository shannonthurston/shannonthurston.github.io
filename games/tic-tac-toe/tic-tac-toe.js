 var app = angular.module('TicTacToeApp', []);
 app.controller('TicTacToeAppCtrl', function($scope) {

     $scope.playerOh = 'o.png';
     $scope.playerEx = 'x.png';
     $scope.nullPic = 'null.png';

     $scope.activePlayer = $scope.playerOh;

     $scope.gameBoard = [
         ['null.png', 'null.png', 'null.png'],
         ['null.png', 'null.png', 'null.png'],
         ['null.png', 'null.png', 'null.png']
     ]

     $scope.resetBoard = function() {
         $scope.gameBoard.forEach(function(r, rIdx) {
             r.forEach(function(col, cIdx) {
                 $scope.gameBoard[rIdx][cIdx] = $scope.nullPic;
             });
         });
         $scope.winner = false;
     }


     $scope.togglePlayer = function() {

         if ($scope.activePlayer == $scope.playerOh) {
             $scope.activePlayer = $scope.playerEx;
         } else {
             $scope.activePlayer = $scope.playerOh;
         }



     }


     $scope.clickBox = function(rowIndex, colIndex) {

         $scope.gameBoard[rowIndex][colIndex] = $scope.activePlayer;
         $scope.checkWinList();
         if ($scope.winner == false) {
             $scope.togglePlayer();
         }


     }

     $scope.winner = false;
     $scope.closeWin = false;

     $scope.checkWinList = function() {
         console.log('checking winlist');
         $scope.winList.forEach(function(row) {
             console.log('checking scenario: ' + row.join());
             var board = $scope.gameBoard;
             var sq1 = board[row[0][0]][row[0][1]];
             console.log('sq1: ' + sq1);
             var sq2 = board[row[1][0]][row[1][1]];
             console.log('sq2: ' + sq2);
             var sq3 = board[row[2][0]][row[2][1]];
             console.log('sq3: ' + sq3);

             if (sq1 == sq2 && sq2 == sq3 && sq1 != $scope.nullPic) {
                 $scope.winner = true;
                 console.log('Winner Found?: ' + $scope.winner);
                 
             } else
             if ((sq1 == sq2 && sq3 == $scope.nullPic && sq1 != $scope.nullPic) || (sq1 == sq3 && sq2 == $scope.nullPic && sq1 != $scope.nullPic) || (sq2 == sq3 && sq1 == $scope.nullPic && sq2 != $scope.nullPic)) {
                 $scope.closeWin = true;
                 console.log('Close win found?: ' + $scope.closeWin);
             }
         });


     }


     $scope.winList = [
         [
             [0, 0],
             [0, 1],
             [0, 2]
         ],
         [
             [1, 0],
             [1, 1],
             [1, 2]
         ],
         [
             [2, 0],
             [2, 1],
             [2, 2]
         ],
         [
             [0, 0],
             [1, 0],
             [2, 0]
         ],
         [
             [0, 1],
             [1, 1],
             [2, 1]
         ],
         [
             [0, 2],
             [1, 2],
             [2, 2]
         ],
         [
             [0, 0],
             [1, 1],
             [2, 2]
         ],
         [
             [0, 2],
             [1, 1],
             [2, 0]
         ]
     ];



 });
