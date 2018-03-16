var app = angular.module("app.todo");

app.factory("serviceApp", ["$http", function ($http) {
    return {
        get: function () {
            return $http.get("/api/all");
        },
        create: function (data) {
            return $http.post("/api/add", data);
        },
        update: function (data) {
            return $http.put("/api/update", data);
        },
        delete: function (id) {
            return $http.delete("/api/delete/" + id);
        }
    };
}]);