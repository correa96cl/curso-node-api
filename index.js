var express = require('express');

 var app = express()

app.listen(3000, function(){
    console.log('O server esta rodando na porta 3000');

});

app.get('/teste', function(req, res){
    res.send('OK');

});