const request = require('request');
const fs = require('file-system');
const Socket = require('net').Socket;
const args = process.argv;
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = args[2];
const path = args[3];
request(url, function (error, response, body) {
    if (response === undefined) {
      console.log('Invalid URL');
      console.log('error:', error);
    }
    
   // Print the error if one occurred
   const options = {
    encoding: 'utf8',
    withFileTypes: false
  };
   fs.readdir('.', options, (err, files) => {
    if (err) {
      console.log(err);
    };
    console.log(path);
    if (!files.includes(`${path.slice(2)}`)) {
      fs.writeFile(path, body, function(err) {
        if (err) {
          console.log('Invalid path entry!!!')
          console.log(err);
        };
        console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
        process.exit();
      
      });
    } else {
      rl.question('Please press Y followed by the enter key to overwrite the file   ', (answer) => {
        if (answer === 'y' && answer === 'Y' && answer === 'yes' && answer === 'Yes') {
          fs.writeFile(path, body, function(err) {
            if (err) {
              console.log(err);
            };
            console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
            process.exit();
          
          });
        }
      })

    }
  });
  
  
  

  
  // console.log(filesArr);
});


// fs.readdir();