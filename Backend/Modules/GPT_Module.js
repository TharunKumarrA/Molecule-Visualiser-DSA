const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); //gemini 1.0 pro is raising some issue

async function Get_Info(compound_formula) {
  const response = {
    responseCode: 200,
    responseBody: "",
  };

  try {
    const prompt = `"I need detailed information about the chemical compound ${compound_formula}.
        Please provide the following details in a clear and structured markdown format:

        1. **Chemical Name** 
           -  The full chemical name
           -  the IUPAC name of the compound.
        2. **Physical Properties** 
           -  melting point
           -  boiling point
           -  density
           -  solubility
           -  state at room temperature.
        3. **Chemical Properties**
           -  Reactivity
           -  pH
           -  stability
           -  any known reactions.
        4. **Uses**
           -  Common applications and industries where this compound is utilized.
        5. **Safety Information**
           -  Including toxicity
           -  handling precautions
           -  safety measures.
        6. **Synthesis**
           -  A brief overview of how this compound is typically synthesized or extracted.
        7. **Regulatory Information**
           -  Any relevant regulatory guidelines
           -  restrictions associated with this compound. 
        Ensure the markdown is well-indented and uses bullet points for lists.
        Format all topic headers as bold titles using markdown syntax (**)
        Provide an extra line break between sections for better readability"`;
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