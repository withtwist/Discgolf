var discApp = angular.module('discgolfControllers', []);


function setupController($scope, datasets) {
    $scope.datasets = datasets.data;
    $scope.users = $scope.datasets.users;
    $scope.courses = $scope.datasets.courses;
    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.currentGame = {
        courseId : 0,
        playerIds : [0,1,2]
    };
    
    

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };


    $scope.setCourse = function(id) {
        $scope.selectedCourseId = id;
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