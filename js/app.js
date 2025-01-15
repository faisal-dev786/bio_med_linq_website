// file download

document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    // Create a link element
    const link = document.createElement("a");

    // Set the file URL (update 'example.txt' with your file URL or path)
    link.href = "./assets/docs/form.pdf";

    // Set the file name for download
    link.download = "Deposit_Authorization_Form.pdf";

    // Trigger the download
    link.click();
  });
// Back to Top

// Get the button
let mybutton = document.getElementById("backToTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
