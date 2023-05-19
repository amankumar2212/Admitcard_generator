const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/conn');
const pdfCreate = require('pdfkit');
const fs = require('fs');
const cors = require('cors');
const { exec } = require('child_process');
const { start } = require('repl');
const app = express();


const PORT = process.env.PORT;


app.use(bodyParser.json());
app.use(cors());

app.post('/post', async (req, res) => {

    const { rollno, name, standard, school, address, phone } = req.body;
    const query = 'INSERT INTO user (rollno, name, standard, school, address, phone) VALUES (?, ?, ?, ?, ?, ?)';

    await connection.query(query, [rollno, name, standard, school, address, phone], (error, results, fields) => {
        if (error) throw error;
        console.log('User added to the database.');
        res.send("User added to the database.");
    });

    const pdfDoc = new pdfCreate({ size: "A4" });
    const stream = pdfDoc.pipe(fs.createWriteStream(`${rollno} ${name}.pdf`));
    pdfDoc.fillColor("red");
    pdfDoc.fontSize(20);
    pdfDoc.text("Admit Card", { align: 'center' });
    pdfDoc.moveDown();
    pdfDoc.fillColor('black');
    pdfDoc.fontSize(15).lineGap(20)

        .text(`Name: ${name}`, { align: 'left', continued: true })
        .text(`Roll No: ${rollno}`, { align: 'right' })
        .text(`Class: ${standard}`, { align: 'left', continued: true })
        .text(`School: ${school}`, { align: 'right' })
        .text(`Address: ${address}`, { align: 'left', continued: true })
        .text(`Phone: ${phone}`, { align: 'right' });

    pdfDoc.end();


    exec(`start chrome "file:///D:/projects/admitcard-pdfgenerator/server/${rollno} ${name}.pdf"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

});



app.get('/download', (req, res) => {
    res.download('generated.pdf', `${rollno} ${name}.pdf`);
});

app.listen(3000, () => {
    console.log("Server is Running on Port : 3000");
});