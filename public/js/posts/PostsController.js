// Grab the app module.
var app = angular.module ('App');

// Create a controller for the app.
app.controller ('Posts.PostsController', [
    '$scope', '$http', '$state',

    function ($scope, $http, $state) {
        console.log ('Post controller created.');

        // Create a post object to store post data.
        $scope.post = {};

        $scope.create = function (id) {
            //Make sure we have a valid form.
            if ($scope.editPost.$valid == true) {
                if(id!=null || id!=undefined){
                    $scope.update (id);
                    return;
                }
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

        $scope.readAll = function (){
            console.log ('Reading in all posts from the db')

            // Make a call to te server to read all of the posts objects avaible
            $http({
                // Specify the http method (GET, POST, PUT ,DELETE)
                method: 'GET',

                url: '/posts?_sort=views&_order=DESC'
            })
            .success(function (response){
                console.log('The post objects: ', response)
                $scope.postList = response;
            })
        }

        $scope.readById = function (id){
            // Make a call to the server to find a post object by id.
            $http ({
                //Provide the http method (GET, POST, OUT, DELETE).
                method: 'GET',

                //Provide the ur;
                url: 'posts/' + id
            })
            .success (function (response){
                console.log ('This is the post object from server: ', response);
                $scope.post = response;
            })
        }

        // Function for updating a post by id
        $scope.update = function (id){
            // Make a call to the server to find a post object by id.
            $http({
                method: 'PUT',
                url: '/posts/' + id,
                data: $scope.post
            })
            .success (function (response){
                // Redirect back to viewing the specific object
                $state.go ('posts-view', { id:id });
            })
        }

        // Function for deleting a post by id
        $scope.delete =function (id){
            // Make a call to the server to delete the post object by id
            $http ({
                method: 'DELETE',
                url:'/posts/' +id
            })
            .success (function (response){
                // Redirect back to post listing page
                $state.go ('posts');
            })
        }

        //function for setting up the controller once it is created.
        function setup (){
            var pageState = $state.current.name;
            console.log ('Current page state is ', pageState);

            if (pageState =='posts'){
                // When in the 'posts' state we need to load in our post objects from the db
                $scope.readAll();
            } else if (pageState == 'posts-view'){
                // When we are in the 'view' state we need to read int the post data by a specific id.
                var postId = $state.params.id;
                console.log (' Test ')
                $scope.readById(postId);
            } else if (pageState == 'posts-edit'){
                var postId = $state.params.id;
                $scope.readById (postId);
                $scope.mode = 'Edit Post';
                $scope.styleClass = 'warning';
            } else if (pageState == 'posts-create'){
                $scope.mode = 'Create Post';
                $scope.styleClass = 'success';
            }
        }

        //run the setup and config for the controller
        setup();
    }
]);
