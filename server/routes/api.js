const express = require("express");
const router = new express.Router();



// API
/** /api/dashboard
  *
  */
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    user: req.user,
  })
});



module.exports = router;