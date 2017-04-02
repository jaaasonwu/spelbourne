"use strict";

define(['angularAMD'],function(angularAMD){
    var app = angular.module('eventService',[]);
    app.service("eventService", function() {
        var event = null;
        var setEvent = function (newEvent) {
            event = newEvent;
        };

        var getEvent = function () {
            return event;
        };

        return {
            setEvent: setEvent,
            getEvent: getEvent
        };
    });
});

