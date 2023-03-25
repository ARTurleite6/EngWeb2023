import express from 'express';
import { createPessoa, deletePessoa, getPessoa, getPessoas, updatePessoa } from '../controllers/pessoas.js';

export const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const pessoas = await getPessoas();
        res.status(200);
        res.send(pessoas);
    } catch(error) {
        res.status(404);
        console.log(error);
        res.send('could not find people');
    }
});

router.get('/pessoas/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const pessoa = await getPessoa(id)
        console.log(pessoa)
        res.status(200)
        res.send(pessoa)
    } catch(error) {
        console.log(error)
        res.status(400)
        res.send('Person not found');
    }
})

router.post('/pessoas', async (req, res) => {
    const pessoa = req.body;
    try {
        const response = await createPessoa(pessoa);
        console.log(response);
        res.status(200);
        res.send(response);
    } catch(error) {
        console.log(error)
        res.status(400);
        res.send('Could not create person')
    }
});

router.put('/pessoas/:id', async(req, res) => {
    const pessoa = req.body;
    const id = req.params.id;
    try {
        const response = await updatePessoa(id, pessoa);
        console.log(response);
        if(response) {
            res.status(200);
            res.send(response);
        }
        else {
            console.log('Não existe esta pessoa com id: ' + id);
            res.status(404);
            res.send('Could not update this person');
        }
    } catch(error) {
        console.log(error);
        res.status(400);
        res.send('Could not update this person');
    }
});

router.delete('/pessoas/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const response = await deletePessoa(id);
        if(response) {
            console.log(response)
            res.status(200);
            res.send(response);
        } else {
            console.log('Não existe esta pessoa com id: ' + id);
            res.status(404);
            res.send(response);
        }
    } catch(error) {
        console.log(error);
        res.status(400);
        res.send('Couldn\'t delete this person');
    }
});