import express from "express";
var request = require('request');
const url = require('url')
const router = express.Router();


router.get('/imgProxy', function (req, res, next) {
    let { url } = req.query;

    var options = {
        method: 'GET',
        url: url,
        headers: {
            'Referer': '',
        }
    };
    request(options).pipe(res)

});
export default router;
