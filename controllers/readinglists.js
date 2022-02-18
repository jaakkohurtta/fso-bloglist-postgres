const { Router } = require("express");
const { Readinglist } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

const router = Router();

router.post("/", tokenExtractor, async (req, res) => {
  if (req.decodedToken) {
    const newReadinglistItem = {
      blogId: req.body.blogId,
      userId: req.decodedToken.id,
    };

    await Readinglist.create(newReadinglistItem);
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  if (req.decodedToken) {
    const readinglist = await Readinglist.findByPk(req.params.id);
    if (readinglist && req.decodedToken.id === readinglist.userId) {
      readinglist.read = req.body.read;
      await readinglist.save();
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } else {
    res.status(401).end();
  }
});

module.exports = router;
