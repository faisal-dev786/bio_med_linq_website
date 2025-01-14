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

const sendOtpBtn = document.querySelector(".sendOtpBtn");
const verifyOtpBtn = document.querySelector(".verifyOtpBtn");
const phoneInput = document.querySelector(".phoneInput");
const otpInput = document.querySelector(".otpInput");
const notification = document.getElementById("notification");
const otpNotification = document.getElementById("otpNotification");

// Function to download the file
function downloadFile(url) {
  // Create an invisible <a> element
  const link = document.createElement("a");
  link.href = url; // Set the URL to the file link
  link.download = url.split("/").pop(); // Use the file name from the URL (optional)

  // Trigger a click on the link to start the download
  link.click();
}
// Send OTP
sendOtpBtn.addEventListener("click", () => {
  const phoneNumber = phoneInput.value.trim();

  // Clear notifications
  notification.classList.add("d-none");
  notification.textContent = "";

  // Validate phone number
  if (!phoneNumber) {
    notification.textContent = "Phone number is required.";
    notification.classList.remove("d-none");
    return;
  }

  fetch("https://biomedlinq.com/api/user/send/otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: phoneNumber }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 1) {
        if (data.data.otpToken) {
          localStorage.setItem("otpToken", data.data.otpToken); // Store otpToken in localStorage
          console.log("OTP Token stored:", data.data.otpToken); // Log to confirm it's stored
        } else {
          console.log("otpToken not found in the response");
        }

        // Clear input and show second modal
        phoneInput.value = "";
        const modal1 = bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal1.hide();
        const modal2 = new bootstrap.Modal(
          document.getElementById("exampleModal2")
        );
        modal2.show();
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    })
    .catch(() => {
      alert(data.message || "Failed to send OTP.");
    });
});

// Verify OTP
verifyOtpBtn.addEventListener("click", () => {
  const otpValue = otpInput.value.trim();

  // Clear OTP notifications
  otpNotification.classList.add("d-none");
  otpNotification.textContent = "";

  // Validate OTP input
  if (!otpValue) {
    otpNotification.textContent = "OTP is required.";
    otpNotification.classList.remove("d-none");
    return;
  }

  // Retrieve otpToken from localStorage
  let otpToken = localStorage.getItem("otpToken");

  if (!otpToken) {
    otpNotification.textContent =
      "OTP Token is missing. Please request OTP again.";
    otpNotification.classList.remove("d-none");
    return;
  }

  fetch("https://biomedlinq.com/api/user/verify/otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      otpToken,
      otp: otpValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 1) {
        otpInput.value = ""; // Clear OTP input
        const modal2 = bootstrap.Modal.getInstance(
          document.getElementById("exampleModal2")
        );
        modal2.hide();
        // Show Modal 3 after OTP verification
        const modal3 = new bootstrap.Modal(
          document.getElementById("exampleModal3")
        );
        modal3.show();

        // Check if the response contains a file URL and trigger download
        if (data.data.link) {
          const fileLink = data.data.link; // Get the file link
          downloadFile(fileLink);
        } else {
          console.error("Error: File link not found in response");
        }

        // Remove otpToken from localStorage after use
        localStorage.removeItem("otpToken");
      } else {
        alert(data.message || "Failed to verify OTP.");
      }
    })
    .catch(() => {
      alert(data.message || "Failed to verify OTP.");
    });
});
