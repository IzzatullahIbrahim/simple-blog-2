// Create the app module.
var app = angular.module ('App', ['ui.router']);

app.config ([
    '$stateProvider',

    function ($stateProvider) {
        // Set the page states.
        $stateProvider
            .state ('home', {
                url: '/',
                template: '<h2>Home Page</h2>'
            })
            .state ('about', {
                url: '/about',
                template: '<h2>About Page</h2>'
            })
            .state ('contact', {
                url: '/contact',
                template: '<h2>Contact Page</h2>'
            })
            .state ('posts', {
                url: '/posts',
                templateUrl: '/templates/posts/list.html',
                controller: 'Posts.PostsController'
            })
            .state ('posts-create', {
                url: '/posts/create',
                templateUrl: '/templates/posts/edit.html',
                controller: 'Posts.PostsController'
            })
            .state ('posts-view', {
                url: '/posts/:id',
                templateUrl: '/templates/posts/view.html',
                controller: 'Posts.PostsController'
            })
            .state ('posts-edit', {
                url: '/posts/:id/edit',
                templateUrl: '/templates/posts/edit.html',
                controller: 'Posts.PostsController'
            })
            .state ('posts-delete', {
                url: '/posts/:id/delete',
                templateUrl: '/templates/posts/delete.html',
                controller: 'Posts.PostsController'
            })
        ;
    }
])
