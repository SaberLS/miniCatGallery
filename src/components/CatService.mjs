const baseUrl = new URL("https://api.thecatapi.com/v1/images/")

export default async function fetchCats(catAmount = 6) {
  const url = new URL(`search?limit=${catAmount}`,baseUrl)

  try {
    const res = await fetch(url);

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error)
  }
}
