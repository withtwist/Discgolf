var discApp = angular.module('discgolfControllers', []);


function setupController($scope, datasets) {
    $scope.datasets = datasets.data;
    $scope.users = $scope.datasets.users;
    $scope.courses = $scope.datasets.courses;
    $scope.courseSelect = {
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.currentGame = {
        courseId : 0,
        players : [{"id":"0","name":"twister"},{"id":"1","name":"Grubla"}],
        addPlayer : function(player) {
            if(!$scope.isPlaying(player)) {
                $scope.currentGame.players.push(player);
            }
        },
        removePlayer : function(player) {
            console.log($scope.currentGame.players);
            if($scope.isPlaying(player)) {
                var index = $scope.currentGame.players.indexOf(player);
                $scope.currentGame.players.splice(index, 1);

            }
        }
    };
    
    

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };


    $scope.setCourse = function(id) {
        $scope.selectedCourseId = id;
    }

    $scope.selectedCourse = function(id) {
        if($scope.currentGame.courseId == id) {
            return "selected";
        } else {
            return "";
        }
    }

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


discApp.controller('setupCtrl', setupController); 
discApp.controller('gameCtrl', gameController);