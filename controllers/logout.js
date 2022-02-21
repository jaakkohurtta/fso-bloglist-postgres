const { Router } = require("express");
const { tokenExtractor } = require("../utils/middleware");
const { Session } = require("../models/index");

const router = Router();

router.delete("/", tokenExtractor, async (req, res) => {
  if (req.decodedToken) {
    const sessions = await Session.findAll({
      where: { userId: req.decodedToken.id },
    });
    sessions.forEach(async (s) => await s.destroy());
    res.status(204).end();
  } else {
    res.status(400).end();
  }
});

module.exports = router;
