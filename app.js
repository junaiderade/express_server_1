const express = require('express')
const dynamo_file = require('./dynamo.js')
const app = express()
app.use(express.json());//you need this to parse data that comes inside of a post request

app.get('/',(req, res) => {
    res.send('Hello World');
});

app.get('/usernames', async (req,res) => {
    try{
        const users = await dynamo_file.getUsernames();
        res.json(users);
    }catch (error){
        console.error(err);
        res.status(500).json({err: 'Something went wrong!'})
    }
})

app.get('/usernames/:username', async (req,res) => {
    try{
        const username = req.params.username; //username is denoted in the url above by the semicolon


    }catch (error){
        console.error(err);
        res.status(500).json({err: 'Something went wrong!'})
    }
});

app.get('/usernames', async (req,res) => {
    try{
        const new_user = await dynamo_file.add_or_update_user(user);
        res.json(new_user);
    }catch (error){
        console.error(err);
        res.status(500).json({err: 'Something went wrong!'})
    }
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('listening on port port');
});

