var discApp = angular.module('discgolfControllers', []);


function setupController($scope, datasets) {
    $scope.status = {
        isopen: true
    };
    $scope.datasets = datasets.data;
    $scope.users = datasets.users;
    $scope.courses = datasets.courses;

    $scope.selectedCourseId = 0;
    

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.getCourseIcon = function(id) {
        if(id == selectedCourseId) {
            return "remove";
        } else {
            return "ok";
        }
    }

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