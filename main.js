// main.js – Restaurant Table Booking System

document.addEventListener("DOMContentLoaded", function () {
  // Grab the form element
  const bookingForm = document.getElementById("bookingForm");

  if (!bookingForm) {
    console.error("Form with ID 'bookingForm' not found.");
    return;
  }

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form field values
    const name = document.getElementById("name").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const table = document.getElementById("table").value;

    // Basic validation
    if (!name || !date || !time || !table) {
      alert("❗Please fill in all fields before booking.");
      return;
    }

    // Create the payload object
    const bookingData = {
      name: name,
      date: date,
      time: time,
      table: table
    };

    // Call the backend using fetch
    fetch("https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec", {
      method: "POST",
      mode: "no-cors", // Avoid CORS issues
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    })
      .then(() => {
        // We can't read response due to no-cors, but assume success
        alert("✅ Your table has been booked successfully!");
        bookingForm.reset(); // Reset form fields
      })
      .catch((error) => {
        console.error("❌ Booking Failed:", error);
        alert("❌ Booking failed. Please try again later.");
      });
  });
});
