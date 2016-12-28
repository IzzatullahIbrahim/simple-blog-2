
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
        ;
    }
])
