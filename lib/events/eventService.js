// Provide functions to do operations regarding to events

const Event = require('./eventModel.js');
const userProfileService = require('../user/userProfileService.js');

var ObjectId = require('mongodb').ObjectID;

let createEvent = function (location, locationId, description, startDate,
        organizerID, createEventDate, duration, visibility, sportType,
        skillLevel, maxParticipant) {
    event = new Event();
    event.location = location;
    event.locationId = locationId;
    event.description = description;
    event.startDate = startDate;
    event.organizerID = organizerID;
    event.skillLevel = skillLevel;
    event.createEventDate = createEventDate;
    event.duration = duration;
    event.visibility = visibility;
    event.sportType = sportType;
    event.skillLevel = skillLevel;
    event.maxParticipant = maxParticipant;

    // Save the user who created the event
    event.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            userProfileService.addEventToUser(
                organizerID,
                event._id,
                function (err) {
                    if (err) {
                        event.remove();
                    }
                }
            );
            console.log("Save the event");
        }
    });
};

let joinEvent = function (eventID, userID, callback) {
    Event.findById(eventID, function (err, data) {
        if (!err) {
            // Check if user already joined the event
            if (data.organizerID == userID ||
                    data.participants.indexOf(userID) != -1) {
                callback("You already joined the event")
            }
            else if (data.maxParticipant <= data.participants.length + 1) {
                callback("The event is full");
            }
            else {
                data.participants.push(userID);
                data.save(function (err) {
                    if (!err) {
                        userProfileService.addEventToUser(
                            userID,
                            eventID,
                            function (err) {
                                callback(err);
                            }
                        );
                    } else {
                        callback(err);
                    }
                });
            }

        } else {
            callback(err);
        }
    });
};

// Get a single event
let getEvent = function (eventID, callback) {
    Event.findById(eventID, callback);
};

// Get all events
let getEventList = function (callback) {
    Event.find(callback);
};

module.exports = {
    createEvent: createEvent,
    getEvent: getEvent,
    getEventList: getEventList,
    joinEvent: joinEvent
};
