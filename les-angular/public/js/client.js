var app = angular.module("app.todo", []);

app.controller("todoController", ['$scope', 'serviceApp', function ($scope, serviceApp) {

    $scope.appName = "Node todo!!!";

    // load all data
    serviceApp.get().then(function (response) {
        $scope.listData = response.data;
        console.log(response.data);
    });

    // add data
    $scope.createData = function () {

    };

    // delete
    $scope.deleteData = function (id) {
        serviceApp.delete(id).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log("Bắt lỗi: "+ JSON.stringify(error));
        });
    }

}]);


