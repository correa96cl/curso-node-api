module.exports = function(app){
    app.get('/pagamentos', function(req, res){
    res.send('OK');

});

app.put('/pagamentos/pagamento/:id', function(req, resp){
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';
    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro){
        console.log(erro);
        
            resp.send(pagamento);

            return;
    
    });

});

app.post('/pagamentos/pagamento', function(req, res){

    req.assert("forma_de_pagamento", "Forma de pagamento é obrigatorio").notEmpty();
    req.assert("valor", "Valor é obrigatorio e deve ser um decimal").notEmpty().isFloat();

    var pagamento = req.body;
    console.log('processando uma requiscao de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();


    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado){
        console.log(erro);
     
        console.log('pagamento criado');
        res.status(201).json(pagamento);
        
    });


});
}

