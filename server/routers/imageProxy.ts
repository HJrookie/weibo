import axios, { ResponseType } from "axios";
import express from "express";
var request = require("request");
const url = require("url");
const router = express.Router();

router.get("/imgProxy", function (req, res, next) {
  let { url } = req.query;
// old 写法. 不能用了 换成下面的
  //   const options = {
  //     method: "GET",
  //     url: url as string,
  //     headers: {
  //       Referer: "",
  //     },
  //     responseType: "stream" as ResponseType,
  //   };
  //   axios(options)
  //     .then((response) => {
  //       response.data.pipe(res);
  //     })
  //     .catch((err) => {
  //       console.log("image-url--error->", url);
  //     });

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url as string,
    responseType: "stream" as ResponseType,
  };

  axios
    .request(config)
    .then((response) => {
      response.data.pipe(res);
    })
    .catch((error) => {
      console.log("image-proxy--error->", url);
    });
});
export default router;
