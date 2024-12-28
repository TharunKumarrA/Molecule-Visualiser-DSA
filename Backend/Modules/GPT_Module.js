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
    console.log(compound_formula)
    compound_formula='C6 H12 O6'
    const prompt = `"I need detailed information about the chemical compound ${compound_formula} ,If there is more isomers consider one yourself and give out response.
        Please provide the following details in a clear and structured markdown format:
         Before providing the information:
         - **validate** the compound formula.
         - If the compound is not found or does not exist, **return the following message**: "The chemical compound '${compound_formula}' could not be identified. Please verify the formula or provide a more specific name."
         - If the compound is recognized, provide the details in the following clear and structured markdown format:

        # {Compund formula here} it should be bold when rendered under react-markdown it should be in h1 tag
        1. **Chemical Name** 🧪
           -  **The Chemical name** :
           -  **the IUPAC name :**. of compund
        2. **Physical Properties** 
           -  **Melting point** ❄️
           -  **Boiling point** ♨️
           -  **Density** ⚖️
           -  **Solubility** 🌊
           -  **State at room temperature** 🏠
        3. **Chemical Properties** ⚗️
           -  **Reactivity** 💥
           -  **pH**
           -  **stability**
           -  **known Chemical reactions**.
        4. **Uses** 🏭
           -  Common applications and industries where this compound is utilized.
        5. **Safety Information** ⚠️
           -  **Including toxicity** ☠️
           -  **handling precautions** 🧤
           -  **safety measures** 🛡️
        6. **Synthesis** 🛠️
           -  A brief overview of how this compound is typically synthesized or extracted.
        7. **Regulatory Information** 📜
           -  Any relevant regulatory guidelines
           -  restrictions associated with this compound. 
        Ensure the markdown is well-indented and uses bullet points for lists.
        Format all topic headers as bold titles using markdown syntax (**)
        Provide an extra line break between sections for better readability"
        Just respond with that format and no html tags in output and no extra messages`;
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