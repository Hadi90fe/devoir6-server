const express = require('express');
const API = require('../controllers/api');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth')

//multer middleware
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads');
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + '_'+ file.originalname)
    },
})
const upload = multer({ storage: storage }).single('image')

// routing
router.get("/", API.fetchAllTortues)
router.get('/:id',API.fetchTortueById);
router.post('/', upload ,auth, API.createTortue);
router.delete('/:id',auth, API.deleteTortue);
router.patch('/:id',upload, auth, API.updateTortue);
router.post('/register', API.register)
router.post('/login', API.login)

router.post('/welcome', auth, (req,res) => {
    res.status(200).send("welcome fake page");
})

module.exports = router;

