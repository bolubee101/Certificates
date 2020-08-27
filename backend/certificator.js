var fs = require("fs");
var PDFDocument = require("pdfkit");
module.exports = (name) => {
  let length = name.length;
  let x;
  if (length >= 26) {
    x = 500;
  } else {
    x = 500 + Math.trunc((26 - length) * 10);
  }

  var pdf = new PDFDocument({
    size: "A3", 
    compress: false,
    layout: "potrait",
  });

  pdf.image("image/DSC.png", 0, 0);

  // Write stuff into PDF
  pdf.font("font/Manrope-VariableFont_wght.ttf");

  pdf.fontSize(40);
  pdf.text(name, x, 280);

  pdf.fontSize(20);
  pdf.text("27 August, 2020", 825, 480);

  // Stream contents to a file
  pdf.pipe(fs.createWriteStream(`certificates/${name}.pdf`)).on("finish", function () {
    console.log("PDF closed");
  });

  // Close PDF and write file.
  pdf.end();
};
