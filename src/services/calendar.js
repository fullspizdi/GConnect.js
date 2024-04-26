// src/services/calendar.js
// Handles interactions with the Google Calendar API

const { google } = require('googleapis');

class CalendarService {
    /**
     * Initializes a new instance of the CalendarService class.
     * @param {google.auth.OAuth2} authClient - The authenticated OAuth2 client.
     */
    constructor(authClient) {
        this.calendar = google.calendar({ version: 'v3', auth: authClient });
    }

    /**
     * Creates a new calendar event.
     * @param {Object} eventDetails - The details of the event to create.
     * @returns {Promise} A promise that resolves with the created event details.
     */
    createEvent(eventDetails) {
        return new Promise((resolve, reject) => {
            this.calendar.events.insert({
                calendarId: 'primary',
                resource: eventDetails,
            }, (err, res) => {
                if (err) {
                    reject(`Failed to create event: ${err}`);
                    return;
                }
                resolve(res.data);
            });
        });
    }

    /**
     * Lists the upcoming events from the user's calendar.
     * @param {number} maxResults - The maximum number of events to retrieve.
     * @returns {Promise} A promise that resolves with the list of events.
     */
    listEvents(maxResults = 10) {
        return new Promise((resolve, reject) => {
            this.calendar.events.list({
                calendarId: 'primary',
                timeMin: (new Date()).toISOString(),
                maxResults: maxResults,
                singleEvents: true,
                orderBy: 'startTime',
            }, (err, res) => {
                if (err) {
                    reject(`Failed to retrieve events: ${err}`);
                    return;
                }
                resolve(res.data.items);
            });
        });
    }

    /**
     * Deletes an event from the calendar.
     * @param {string} eventId - The ID of the event to delete.
     * @returns {Promise} A promise that resolves when the event is deleted.
     */
    deleteEvent(eventId) {
        return new Promise((resolve, reject) => {
            this.calendar.events.delete({
                calendarId: 'primary',
                eventId: eventId,
            }, (err) => {
                if (err) {
                    reject(`Failed to delete event: ${err}`);
                    return;
                }
                resolve(`Event with ID: ${eventId} has been deleted.`);
            });
        });
    }
}

module.exports = CalendarService;
