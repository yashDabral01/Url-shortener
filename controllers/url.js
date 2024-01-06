const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortUrl(req, res) {
  try{
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ message: "URL is required!!" });
    }
    const shortID = shortid();
    await URL.create({
      // to add an element or document in the collection(table)
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    });
    console.log("URL is generated")
    return res.status(201).json({ id: shortID });
  }catch(error){
    return res.status(500).send("Internal Server Error")
  }
 
}
async function handleShortId(req, res) {
    const shortId = req.params.shortId;
    try{
      const result = await URL.findOneAndUpdate(
        { shortId, },  //query to find document with id shortid  
        {
          $push: {                      // push a record in the visitHistory array
            visitHistory:{
                timestamp:Date.now(),
            },
          },
        }
      );
       res.redirect(result.redirectUrl);
    }catch(error){
      return res.status(500).send("Internal Server Error")
    }
   
}
module.exports = {
  handleGenerateNewShortUrl,
  handleShortId,
};
