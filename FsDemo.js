// import fs from 'fs';
import fs from 'fs/promises'

//readFile() - callback
// fs.readFile('./text.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })

// readFileSync() - Synchronous callback
// const data = fs.readFileSync('./text.txt', 'utf8');
// console.log(data)

//readFile() - Promise .the()
// fs.readFile('./text.txt', 'utf8')
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

//readFile() - async/await
const readFile = async () => {
    try{
        const data = await fs.readFile('./text.txt', 'utf8');
        console.log(data)
    }catch(err) {
        console.log(err);
    }
}

//writeFile()
const writeFile = async () => {
    try{
        await fs.writeFile('./text.txt', 'Hello, This is a new phrase!');
        console.log('File overloaded successfully');
    }catch(err) {
        console.log(err)
    } 
}

//appendFile()
const appendFile = async () => {
    try{
        await fs.appendFile('./text.txt', '\nHello, This is a new appending phrase');
        console.log('Phrase appended successfully');
    }
    catch(err){
        console.log(err)
    }
}

writeFile()
appendFile()
readFile()
