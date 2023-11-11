const router = require('express').Router();

router.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'public/index.html'));
    //get alll to dos:
});

module.exports = router;