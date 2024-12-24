const GPT_Module = require('../Modules/GPT_Module');


async function GPT_Controller(req, res){
    const compound_formula = req.params.compound;
    const response = await GPT_Module(compound_formula);
    if(response.responseCode === 200){
        res.status(200).json(response.responseBody);
    }
    else{
        res.status(100).json(response.responseBody);
    }
}

module.exports = GPT_Controller;