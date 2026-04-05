/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
const API_BASE = "https://2658dk-5000.csb.app";

async function fetchModel(url) {
  const path = url.startsWith("/") ? url : `/${url}`;
  const response = await fetch(`${API_BASE}${path}`);

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON from server.");
  }
}

export default fetchModel;