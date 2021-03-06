define(['app'], function (app) {
    app.controller('resultController', ['$scope', '$http', '$location', "eventService", "userService",
        function ($scope, $http, $location, eventService, userService) {
            // configuration for date picker
            $scope.format = ["dd-MM-yyyy", "dd/MM/yyyy"];
            //default date
            $scope.dateSelect = null;
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.dp = {
                opened: false,
                click: function () {
                    this.opened = !this.opened;
                }
            };

            // What sports type we have
            $scope.types = [
                "Any",
                "Tennis",
                "Basketball",
                "Soccer",
                "Golf",
                "Swimming",
                "Running"
            ];
            // Default is none
            $scope.typeSelect = $scope.types[0];

            // Default is any
            $scope.skillSelect = "Any";

            // Different skill levels
            $scope.skills = [
                "Any",
                "Starter",
                "Intermediate",
                "Master"
            ];

            eventService.getEventList(
                function (res) {
                    $scope.eventList = res.data;
                    $scope.eventList.forEach(function(event) {
                        event.isJoined = userService.isJoinedEvent(event);
                        event.startDate = new Date(event.startDate);
                        eventService.getIcon(
                            event.sportType,
                            function (path) {
                                event.img = path.data;
                            }
                        );
                    });
                    // Sort the event according to start date
                    $scope.eventList.sort(function (a, b) {
                        if (a.startDate < b.startDate) {
                            return -1;
                        } else if (a.startDate > b.startDate) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                },
                function (res) {
                    console.log(res.data.msg[0]);
                }
            );

            $scope.viewEvent = function (event) {
                $location.path("/viewEvent/" + event._id);
            };

            $scope.joinEvent = function (event) {
                // Clone the data
                var data = {"eventID": event._id}

                eventService.joinEvent(
                    data,
                    function (res) {
                        $location.path("/viewEvent/" + event._id);
                    },
                    function (res) {
                        $location.path("/viewEvent/" + event._id);
                    }
                );
            };
        }]);
});
