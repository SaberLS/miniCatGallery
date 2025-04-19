const BASE_URL = new URL("https://api.thecatapi.com/v1/images/")


/**
 * Fetches a specified number of cat images from The Cat API.
 *
 * @param {number} catAmount - Number of cat images to fetch (default is 6).
 * @returns {Promise<Object[]>} A promise that resolves to an array of cat image objects.
 */
export default async function fetchCats(catAmount = 6) {
  const url = new URL('search',BASE_URL);
  url.searchParams.set('limit', catAmount)

  try {
    const res = await fetch(url);

    if(!res.ok)
      throw new Error(`Failed to fetch cats: ${res.status} ${res.statusText}`);

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching cats:", error);
    return [];
  }
}
