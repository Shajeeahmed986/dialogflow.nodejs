const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion, Card } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
const  nodemailer = require('nodemailer');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
  
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add(`Hi i am pizza bot Ai Assistant   how can help you ?? ` )
    }
    function fallBack(agent) {
        console.log(`intent  =>  hi`);
        agent.add("fallback from server side?")
    }


    
    function order(agent) {
        console.log(`intent  =>  hi`);
        const {givenname, phone , address , email} = agent.parameters;

      

    
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'harisqureshi415@gmail.com',
              pass: 'hfnodldnpfuaagmo'
            }
          });
          
          var mailOptions = {
            from: 'harisqureshi415@gmail.com',
            to: email,
            subject: 'Sending Email from Backend',
            text: `Hello Sir/Madam! hope you are received email kindly confirm  your name ${givenname} your contact number ${phone}  and your email ${email} and your addres ${address}  thank you` 
          };
        
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
          agent.add("ok sir your is done")




    }

    let intentMap = new Map();
    intentMap.set('Default Fallback Intent', fallBack); 
    intentMap.set('hi', hi); 
    intentMap.set('order', order); 
  
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});