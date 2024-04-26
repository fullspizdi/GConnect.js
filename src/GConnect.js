// src/GConnect.js
// Main class for managing connections to Google services

const { google } = require('googleapis');
const auth = require('./auth');
const GmailService = require('./services/gmail');
const DriveService = require('./services/drive');
const SheetsService = require('./services/sheets');
const CalendarService = require('./services/calendar');

class GConnect {
    /**
     * Initializes a new instance of the GConnect class with the provided credentials.
     * @param {Object} credentials - The OAuth2 credentials required for Google API access.
     */
    constructor(credentials) {
        // Initialize the authentication client
        this.authClient = auth.initializeAuth(credentials);

        // Initialize services with the authenticated client
        this.gmail = new GmailService(this.authClient);
        this.drive = new DriveService(this.authClient);
        this.sheets = new SheetsService(this.authClient);
        this.calendar = new CalendarService(this.authClient);
    }
}

module.exports = GConnect;
