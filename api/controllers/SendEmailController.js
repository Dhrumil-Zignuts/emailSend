/**
 * SendEmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: async (req, res) => {
    try {
      const { to, body, subject, bcc, cc } = req.body;
      console.log("req.body: ", req.body);

      let authToken = req.headers["authorization"];
      console.log("authToken: ", authToken);

      let authTokenType = authToken.split(" ")[0];
      console.log("authTokenType: ", authTokenType);

      // if (authTokenType !== "Bearer") {
      //   return res.status(400).json({
      //     message: "auth Token not Found",
      //   });
      // }

      const result = {};
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "demo.zignuts@gmail.com",
          pass: "rjgsrbwbdvykvosd",
        },
      });

      const data = {
        from: "demo.zignuts@gmail.com",
        to: to,
        subject: subject,
        cc: cc,
        bcc: bcc,
        text: body,
      };

      await transporter.sendMail(data, (err, info) => {
        console.log("data: ", data);
        if (err) {
          console.log("err: ", err);
          result["hasError"] = true;
          return res.status(400).json({
            message: "Email not sent",
            data: result,
          });
        } else {
          console.log("mail Send successFully");
          result["hasError"] = false;
          result["data"] = info.response;
          return res.status(200).json({
            message: "Email Sent",
            data: result,
          });
        }
      });
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        message: "internal server error",
        error: error.message,
      });
    }
  },
};
