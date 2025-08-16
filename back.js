const fs = require('fs');
const readline = require('readline');

// HTML file path (Update the path if necessary)
const htmlFilePath = 'index.html';

// Currency list with IDs from HTML
const currencies = [
    { id: "usd-sar-rate", name: "US Dollar (USD)" },
    { id: "gbp-sar-rate", name: "British Pound (GBP)" },
    { id: "eur-sar-rate", name: "Euro (EUR)" },
    { id: "kwd-sar-rate", name: "Kuwaiti Dinar (KWD)" },
    { id: "bhd-sar-rate", name: "Bahraini Dinar (BHD)" },
    { id: "aed-sar-rate", name: "UAE Dirham (AED)" },
    { id: "omr-sar-rate", name: "Omani Rial (OMR)" },
    { id: "qar-sar-rate", name: "Qatari Riyal (QAR)" }
];

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Read the existing HTML file
fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the HTML file:", err);
        rl.close();
        return;
    }

    // Function to process user input
    let index = 0;
    function askForRate() {
        if (index < currencies.length) {
            const currency = currencies[index];
            rl.question(`Enter exchange rate for ${currency.name} to SAR: `, (rate) => {
                if (!isNaN(rate) && rate.trim() !== '') {
                    // Replace the existing rate in the HTML file
                    const regex = new RegExp(`(<span id="${currency.id}">)([^<]+)(</span>)`, 'g');
                    data = data.replace(regex, `$1${parseFloat(rate).toFixed(2)}$3`);
                }
                index++;
                askForRate();
            });
        } else {
            // Write the updated data back to the HTML file
            fs.writeFile(htmlFilePath, data, 'utf8', (err) => {
                if (err) {
                    console.error("Error updating the HTML file:", err);
                } else {
                    console.log("Exchange rates updated successfully!");
                }
                rl.close();
            });
        }
    }

    // Start asking for exchange rates
    askForRate();
});
