(function() {
    'user strict';

    angular.module("app.shared")
        .factory("sessionService", factory);

    factory.$inject = [
        'webApiService'
    ];

    function factory(
        webApiService
    ) {
        var guestUsername = "Guest";

        var user = {
            username: guestUsername,
            isAuthenticated: false
        }

        var service = {
            user: user,
            setCurrentUser: setCurrentUser,
            signOut: signOut
        }

        //////////

        function signOut() {
            webApiService.postData("Account", "LogOut", {})
                .then(()=> {
                    setCurrentUser(guestUsername, false);
                });

        }

        function setCurrentUser(username, isAuthenticated) {
            user.username = username;
            user.isAuthenticated = isAuthenticated;
        }

        //Privaet methods
        function getCurrentUser() {
            webApiService.getData('Account', 'GetCurrentUser')
                .then((result) => {
                    if (result && result.data && result.data.success === true)
                        setCurrentUser(result.data.username, true);
                });
        }

        

        getCurrentUser();

        return service;
    }
})();