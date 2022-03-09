const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const data = fs.readFileSync('./data.json', 'utf-8');
const dataObj = JSON.parse(data);




const fsIndex = fs.readFileSync('./index.html', 'utf-8');
const fsApp = fs.readFileSync('./app.html', 'utf-8');
const cards = fs.readFileSync('./cards.html', 'utf-8');

let inline = (temp, data) => {
    let text = temp.replace(/{%title%}/g, data.title);
    text = text.replace(/{%description%}/g, data.description);
    
    return text;
}

// console.log(data);
http.createServer((req,res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    
    if (req.url === '/' || req.url === '/triall' ) {
        const cardsHtml = dataObj.map(el => inline(cards, el)).join('');
        const output = fsIndex.replace('{%cards%}', cardsHtml); 
        res.end(output);
    }else if (req.url === '/app') { 
        const cardsApp = dataObj.map(el => inline(cards, el)).join('');
        const output = fsApp.replace('{%cards%}', cardsApp);

        res.end(output);
    }
    else{
        res.writeHead(404, {
            "content-type": "text/html",
            "my-own-header": "Hello world",
          });
        res.end('<h3>Page Not Found </h3>');
    }

    
    
}).listen(3030, '127.0.0.1', () => {console.log('listening at port 3030');});