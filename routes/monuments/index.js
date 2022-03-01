var express = require('express');
var router = express.Router();
router.get('/', async function(req,res){
    //read from spreadsheet
    const auth =new google.auth.GoogleAuth({
        kyfile:process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes:"https://www.googleapis.com/auth/spreadsheets",
    });
    //create client instance for auth
    const client= await auth.getClient
    const spreadsheetId="1eK1e0x7xL1-NmLtyV-gtuGEoKk03k48W_MY5z976H9U"
    //Sheets Instance
    
    const googleSheets=google.sheets({version:"v4",auth:client});
    //Get Metadata
    const metaData= await googleSheets.spreadsheets.get({
       auth,
       spreadsheetId
    })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:"Αξιοθέατα",
    });
    res.json(getRows.data)
})
router.post('/',async  function (req, res) {
    //write
    //read from spreadsheet
    const auth =new google.auth.GoogleAuth({
        kyfile:process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes:"https://www.googleapis.com/auth/spreadsheets",
    });
    //create client instance for auth
    const client= await auth.getClient
    const spreadsheetId="1eK1e0x7xL1-NmLtyV-gtuGEoKk03k48W_MY5z976H9U"
    //Sheets Instance
    
    const googleSheets=google.sheets({version:"v4",auth:client});
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range:"Αξιοθέατα!A:B",//after ! we wnter the range of collumns we affect
        valueInputOption:"RAW",//"USER_ENTERED"
        resource:{
            values:[
                //row
                [
                    //columns
                    "test value col 1",
                    "test value col 2"
                ]
            ]
        }
    })
    res.send(JSON.stringify(req.body));

})
module.exports = router;