import axios, { ResponseType } from "axios";
import express from "express";
var request = require('request');
const url = require('url')
const router = express.Router();


router.get('/imgProxy', function (req, res, next) {
    let { url } = req.query;

    var options = {
        method: 'GET',
        url: url as string,
        headers: {
            'Referer': '',
        },
        responseType: "stream" as ResponseType
    };
    axios(options).then(response => {
        response.data.pipe(res)
    })

});
export default router;
