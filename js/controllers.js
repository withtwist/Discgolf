var discApp = angular.module('discgolfControllers', ['ui.bootstrap']);


function setupController($scope, $route, datasets) {
    $scope.$route = $route;
    $scope.datasets = datasets.data;
    $scope.users = $scope.datasets.users;
    $scope.courses = $scope.datasets.courses;

    $scope.currentGame = {
        courseId : 0,
        players : $scope.users.slice(),
        addPlayer : function(player) {
            if(!$scope.isPlaying(player)) {
                $scope.currentGame.players.push(player);
            }
        },
        removePlayer : function(player) {
            if($scope.isPlaying(player)) {
                var index = $scope.currentGame.players.indexOf(player);
                $scope.currentGame.players.splice(index, 1);

            }
        }
    };

    $scope.isPlaying = function(player) {
        for (var i=0; i<$scope.currentGame.players.length; i++) {
            if ($scope.currentGame.players[i].id == player.id) {return true;}
        }
        return false;
    }

}
function gameController($scope) {
    $scope.hej="HeJ";
}

setupController.resolve = {
    datasets : function($http) {
        return $http({
            method: 'GET', 
            url: 'http://simonalmgren.com/discgolf/getJSON.php'
        });
    }
}

function datepickerController($scope) {
    $scope.today = function() {
    $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

      // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return false;
        //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
          {
            date: tomorrow,
            status: 'full'
          },
          {
            date: afterTomorrow,
            status: 'partially'
          }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i=0;i<$scope.events.length;i++){
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
    };
}


discApp.controller('setupCtrl', setupController); 
discApp.controller('gameCtrl', gameController);
discApp.controller('dtpCtrl', datepickerController);