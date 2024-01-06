const express = require("express");
const {handleGenerateNewShortUrl,handleShortId} = require("../controllers/url")
const router = express.Router();

router.post("/",handleGenerateNewShortUrl);
router.get("/:shortId",handleShortId);

module.exports = router;
