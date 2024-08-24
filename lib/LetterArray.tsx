import axios from "axios";

async function getWords() {
  try {
    const result = await axios.post("http://localhost:3001/getwords");
    console.log(result.data);
    return result.data; // Return the data instead of assigning it directly
  } catch (e) {
    console.log(e);
    return []; // Return an empty array in case of error
  }
}

export default getWords;
