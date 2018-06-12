const serverless = require("serverless-http");
const AWS = require("aws-sdk");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

if (!AWS.config.region) {
  AWS.config.update({
    region: "us-east-1"
  });
}

const ses = new AWS.SES();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const emailParams = {
    Source: "youremail@gmail.com", // Your Verified Email
    Destination: {
      ToAddresses: ["youremail@gmail.com"], // 
    },
    ReplyToAddresses: [req.body.email],
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `${message}  from  ${req.body.email}`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "You Received a Message from www.domainname.com"
      }
    }
  };

  ses.sendEmail(emailParams, (err, data) => {
    if (err) {
      res.status(402).send(`${err} ${err.stack}`);
    }
    if (data) {
      res.send(data);
    }
  });
});

module.exports.form = serverless(app);
