import { Response } from './response';

const API_URL = 'https://v3wzsqqhry-dsn.algolia.net/1/indexes/*/queries';
const APP_ID = 'V3WZSQQHRY';
const API_KEY = 'b65df2940f35f37b25e5ce07ebfe17f0';

/**
 * Fetches plant icon information from the BioRender API
 * @param plantName - The name of the plant to search for
 * @returns The URL of the first matching plant icon, or null if none found
 */
export const fetchPlantIcon = async (plantName: string): Promise<string | null> => {
    try {
        const requestBody = {
            requests: [{
                indexName: 'prod_assets',
                params: `query=${encodeURIComponent(plantName)}&hitsPerPage=1&page=0&filters=isPublished%3Atrue%20AND%20(available%3Atrue%20OR%20image.imageFormatVersion%3A20240412)&facets=%5B%5D&tagFilters=`,
            },],
        };

        const response = await fetch(`${API_URL}?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0%3Binstantsearch.js%202.10.5%3BJS%20Helper%202.26.1&x-algolia-application-id=${APP_ID}&x-algolia-api-key=${API_KEY}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json',
            }, body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json() as { results: Response['results'] };

        // Check if we have hits in the response
        if (data.results[0]?.hits?.length > 0) {
            const firstHit = data.results[0].hits[0];

            // If URL exists, transform it
            if (firstHit.image?.url) {
                // Extract the image path components
                const urlPath = firstHit.image.url;

                // Example: sources/icons/65d4cdf19acecc74b6f32722/20240220160658/image/65d4cdf19acecc74b6f32722.svg
                // Extract ID and timestamp from URL
                const matches = urlPath.match(/\/([^\/]+)\/([^\/]+)\/image\/([^\.]+)/);

                if (matches && matches.length >= 3) {
                    const id = matches[1];
                    const timestamp = matches[2];
                    // Construct the correct URL format
                    return `https://icons.biorender.com/w200xh253/${id}/${timestamp}/image/${id}.png`;
                }
            }
            return firstHit.image?.url || null;
        }

        return null;
    } catch (error) {
        console.error('Error fetching plant icon:', error);
        return null;
    }
};