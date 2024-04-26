// src/services/sheets.js
// Service class for interacting with Google Sheets API

const { google } = require('googleapis');

class SheetsService {
    /**
     * Initializes a new instance of the SheetsService class.
     * @param {google.auth.OAuth2} authClient - The authenticated OAuth2 client.
     */
    constructor(authClient) {
        this.sheets = google.sheets({ version: 'v4', auth: authClient });
    }

    /**
     * Creates a new spreadsheet with the given title.
     * @param {string} title - The title of the spreadsheet.
     * @returns {Promise<Object>} The created spreadsheet details.
     */
    createSpreadsheet(title) {
        const request = {
            resource: {
                properties: {
                    title: title
                }
            }
        };

        return this.sheets.spreadsheets.create(request)
            .then(response => response.data)
            .catch(error => console.error('Failed to create spreadsheet:', error));
    }

    /**
     * Reads data from a specified range in a spreadsheet.
     * @param {string} spreadsheetId - The ID of the spreadsheet.
     * @param {string} range - The A1 notation of the range to read.
     * @returns {Promise<Array>} The data read from the spreadsheet.
     */
    readData(spreadsheetId, range) {
        return this.sheets.spreadsheets.values.get({
            spreadsheetId,
            range
        })
        .then(response => response.data.values)
        .catch(error => console.error('Failed to read data from spreadsheet:', error));
    }

    /**
     * Writes data to a specified range in a spreadsheet.
     * @param {string} spreadsheetId - The ID of the spreadsheet.
     * @param {string} range - The A1 notation of the range to write to.
     * @param {Array<Array>} values - The data to write.
     * @returns {Promise<void>}
     */
    writeData(spreadsheetId, range, values) {
        const resource = {
            values: values
        };

        return this.sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource
        })
        .then(() => console.log('Data written successfully!'))
        .catch(error => console.error('Failed to write data to spreadsheet:', error));
    }
}

module.exports = SheetsService;
