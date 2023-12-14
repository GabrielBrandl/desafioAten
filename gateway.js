const express = require('express');
const app = express();
const usersService = require('./users');
const financialService = require('./financial');

app.use(express.json());

// saldo
app.get('/saldo', (req, res) => {
    const userId = req.query.id_do_cliente;
    const userBalance = usersService.getBalance(userId);
    res.json({ saldo: userBalance });
});

// transacao
app.post('/transacao', (req, res) => {
    const userId = req.query.id_do_cliente;
    const { valor, tipo } = req.body;

    if (financialService.addTransaction(userId, valor, tipo)) {
        res.status(201).send('Transação adicionada com sucesso.');
    } else {
        res.status(400).send('Transacção inválida')
    }
});

