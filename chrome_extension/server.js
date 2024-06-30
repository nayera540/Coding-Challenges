const expres = require('express');
const app = expres();
const cors = require('cors');


app.use(
    cors({
        origin: '*'
    })
);

app.get("/data", async(req,res)=> {
    const fetch = await import('node-fetch');
    const response = await fetch.default("https://codingchallenges.substack.com/feed");
    const xml = await response.text();
    res.header("Content-Type", "application/xml");
    res.send(xml);
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});