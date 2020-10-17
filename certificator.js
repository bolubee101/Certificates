var fs = require("fs");
var PDFDocument = require("pdfkit");

let main = (email,name) => {
  return (myFirstPromise = new Promise((resolve, reject) => {
    var pdf = new PDFDocument({
      size: "A3",
      compress: false,
      layout: "potrait",
    });

    pdf.image("image/cert.jpg", 0, 0);

    // Write stuff into PDF
    pdf.font("font/Aulyars.otf");

    pdf.fontSize(37);
    pdf.text(name.toUpperCase(), 100,450, {
      width:1000,
      align:"center"
    });

    // Stream contents to a file
    pdf
      .pipe(fs.createWriteStream(`certificates/${email}.pdf`))
      .on("finish", function () {
        console.log("PDF closed");
        resolve();
      });

    // Close PDF and write file.
    pdf.end();
  }));
};

module.exports = main;
