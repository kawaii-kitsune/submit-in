var express = require('express');
var router = express.Router();
const uuid=require('uuid').v4;
const multer=require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req, file,cb)=>{
        // const {originalname}=file;
        cb(null,file.originalname);
    }
});
const upload=multer({storage: storage})

router.get('/', async (req,res) =>{
    res.send('entertainment');
})
router.post('/',upload.array('pictures',12),async (req, res,next) =>{
    var response = '<a href="/">Home</a><br>';
    response += "Files uploaded successfully.<br>";
    req.files.forEach(element => response += `<img src="${element.path}" /><br>`);
    return res.send(response);
    //write 
    // if(req.files){
    //     console.log(req.files)
    //     var file=req.files.files;
    //     var filename= file.filename;
    //     var filepath= './uploads/'+filename;
    //     file.mv(filepath,function(err){
    //         if(err){
    //             res.send(err);
    //         }else{
    //             res.send('lol');
    //         }
    //     });
    // }
    //read from spreadsheet
    // const auth =new google.auth.GoogleAuth({
    //     kyfile:process.env.GOOGLE_APPLICATION_CREDENTIALS,
    //     scopes:"https://www.googleapis.com/auth/spreadsheets",
    // });
    // //create client instance for auth
    // const client= await auth.getClient
    // const spreadsheetId="1eK1e0x7xL1-NmLtyV-gtuGEoKk03k48W_MY5z976H9U"
    // //Sheets Instance
    
    // const googleSheets=google.sheets({version:"v4",auth:client});
    // await googleSheets.spreadsheets.values.append({
    //     auth,
    //     spreadsheetId,
    //     range:"Κέντρα Διασκέδασης!A:B",//after ! we wnter the range of collumns we affect
    //     valueInputOption:"RAW",//"USER_ENTERED"
    //     resource:{
    //         values:[
    //             //row
    //             [
    //                 //columns
    //                 "test value col 1",
    //                 "test value col 2"
    //             ]
    //         ]
    //     }
    // })
    // res.send(JSON.stringify(req.body));

});

module.exports = router;