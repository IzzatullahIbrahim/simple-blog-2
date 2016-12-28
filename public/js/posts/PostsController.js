// Grab the app module.
var app = angular.module ('App');

// Create a controller for the app.
app.controller ('Posts.PostsController', [
    '$scope', '$http', '$state',

    function ($scope, $http, $state) {
        console.log ('Post controller created.');

        // Create a post object to store post data.
        $scope.post = {};

        $scope.create = function () {
            // Make sure we have a valid form.
            if ($scope.editPost.$valid == true) {
                console.log ('Create a new post object on db: ', $scope.post);

                // Make a request to the server to save
                // the new post object data.
                $http ({
                    // Specify the http method to use (GET, POST, PUT, DELETE).
                    method: 'POST',

                    // Provide the url of the server where we are
                    // sending the data.
                    url: '/posts',

                    // Provide the data to actually send.
                    data: $scope.post
                })
                .success (function (response) {
                    console.log ('Object was saved to the db.');

                    // Specify the route that we go to after
                    // the post has been successfully saved.
                    $state.go ('posts');
                })
            }
            else {
                // Notify user that something is wrong with the form.
                console.error ('Something is wrong with the form.');
            }
        }
    }
]);
