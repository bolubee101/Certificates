var fs = require("fs");
var PDFDocument = require("pdfkit");
//module.exports =

let main = (email,name) => {
  return (myFirstPromise = new Promise((resolve, reject) => {
    let length = name.length;
    let x;
    let font;
    if (length < 20) {
      x = 503 + ((28 - length) / 2) * 18.46;
      console.log(x);
      font = 30;
    }
    if (length > 20) {
      x = 503 + ((33.6 - length) / 2) * 15.39;
      font = 25;
    }
    if (length > 25) {
      x = 528 + ((33.6 - length) / 2) * 15.39;
      font = 25;
    }
    var pdf = new PDFDocument({
      size: "A3",
      compress: false,
      layout: "potrait",
    });

    pdf.image("image/DSC.png", 0, 0);

    // Write stuff into PDF
    pdf.font("font/Product Sans Bold.ttf");

    pdf.fontSize(font);
    pdf.text(name.toUpperCase(), x, 300);

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
