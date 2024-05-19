const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest"});

async function Get_Info(compound_formula){
    const response = {
        responseCode: 200,
        responseBody: ""
    };

    try {
        const prompt = `Give Breif Description about the properties of the chemical compound ${compound_formula}.`
        const result = await model.generateContent(prompt);
        const GPTresponse = result.response;
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