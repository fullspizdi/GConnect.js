// src/auth.js
// Handles OAuth2 authentication for Google API services

const { google } = require('googleapis');

/**
 * Initializes the OAuth2 client with the provided credentials.
 * @param {Object} credentials - The OAuth2 credentials required for Google API access.
 * @returns {google.auth.OAuth2} The initialized OAuth2 client.
 */
function initializeAuth(credentials) {
    const { clientId, clientSecret, redirectUri } = credentials;
    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
    );

    // Set the necessary scopes
    const scopes = [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/calendar'
    ];

    // Generate the url that will be used for the consent dialog.
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });

    console.log(`Authorize this app by visiting this url: ${authUrl}`);

    return oauth2Client;
}

module.exports = {
    initializeAuth
};
