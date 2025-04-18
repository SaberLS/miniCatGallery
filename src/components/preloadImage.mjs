/**
 * preloadImage
 *
 * Preloads an image from a given URL and returns a Promise that resolves
 * with the Image object once the image is fully loaded.
 *
 * @param {Object} params
 * @param {string} params.url - The URL of the image to preload.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded Image element,
 * or rejects if the image fails to load.
 */
const preloadImage = ({ url }) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    // console.log(img);
    img.onload = () => resolve(img);
    img.onerror = reject;
});

export default preloadImage
