/**
 * Loads data from the given URL and returns it as JSON.
 * @param {string} URL - The URL to fetch data from.
 * @returns {Promise<Object|null>} The data from the URL as JSON, or null if an error occurs.
 */
async function loadData(URL) {
    try {
        let response = await fetch(URL + ".json");
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error in loadData function:", error);
        return null;
    }
}