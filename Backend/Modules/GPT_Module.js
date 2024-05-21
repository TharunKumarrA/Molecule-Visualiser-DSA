const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

async function Get_Info(compound_formula) {
  const response = {
    responseCode: 200,
    responseBody: "",
  };

  try {
    const prompt = `"I need detailed information about the chemical compound ${compound_formula}. Could you provide the following details:

        Chemical Name : The full chemical name and the IUPAC name of the compound.
        Physical Properties: Such as melting point, boiling point, density, solubility, and state at room temperature.
        Chemical Properties: Reactivity, pH, stability, and any known reactions.
        Uses: Common applications and industries where this compound is utilized.
        Safety Information: Including toxicity, handling precautions, and safety measures.
        Synthesis: A brief overview of how this compound is typically synthesized or extracted.
        Regulatory Information: Any relevant regulatory guidelines or restrictions associated with this compound. In Markdown format, please.
        Give the above mentioned content is a neat point wise format with bold topic names
        Add space between the properties in the markdown. Add bullet points."`;
    const result = await model.generateContent(prompt);
    const GPTresponse = result.response.candidates[0].content.parts[0].text;
    response.responseBody = GPTresponse;
    console.log(response.responseBody);
  } catch (error) {
    response.responseCode = 100;
    response.responseBody = error;
    console.log(response.responseBody);
  }
  return response;
}

module.exports = Get_Info;