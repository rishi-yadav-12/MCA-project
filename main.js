document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("change", function () {
      passwordInput.type = this.checked ? "text" : "password";
    });
  }

  const bookingForm = document.getElementById("bookingForm");
  const bookingMessage = document.getElementById("bookingMessage");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const guests = parseInt(document.getElementById("guests").value);

      fetch("https://script.google.com/macros/s/AKfycby6USxUd5RtOTcYRpu1exdQowmieTrq2QRlxVo53YsPXlh9ChhMefKZ2g0hJtYGwKUOAw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, time, guests })
      })
      .then(res => res.json())
      .then(data => {
        bookingMessage.style.color = "#6fff7f";
        bookingMessage.textContent = "✅ Booking confirmed!";
        bookingForm.reset();
      })
      .catch(() => {
        bookingMessage.style.color = "#ff4d4d";
        bookingMessage.textContent = "❌ Booking failed.";
      });
    });
  }

  const bookingList = document.getElementById("bookingList");
  if (bookingList) {
    fetch("https://script.google.com/macros/s/AKfycby6USxUd5RtOTcYRpu1exdQowmieTrq2QRlxVo53YsPXlh9ChhMefKZ2g0hJtYGwKUOAw/exec")
    .then(res => res.json())
    .then(bookings => {
      bookingList.innerHTML = "";
      if (bookings.length === 0) {
        bookingList.innerHTML = "<li>No bookings found.</li>";
      } else {
        bookings.forEach((b, i) => {
          const li = document.createElement("li");
          li.textContent = `#${i + 1} — ${b.name} booked on ${b.date} at ${b.time} for ${b.guests} guests`;
          bookingList.appendChild(li);
        });
      }
    });
  }

  const adminList = document.getElementById("adminBookingList");
  if (adminList) {
    fetch("https://script.google.com/macros/s/AKfycby6USxUd5RtOTcYRpu1exdQowmieTrq2QRlxVo53YsPXlh9ChhMefKZ2g0hJtYGwKUOAw/exec")
    .then(res => res.json())
    .then(bookings => {
      adminList.innerHTML = "";
      if (bookings.length === 0) {
        adminList.innerHTML = "<li>No bookings available.</li>";
      } else {
        bookings.forEach((b, i) => {
          const li = document.createElement("li");
          li.textContent = `#${i + 1} — ${b.name} booked on ${b.date} at ${b.time} for ${b.guests} guests`;
          adminList.appendChild(li);
        });
      }
    });
  }
});

function loginCheck() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "";
  if (!username || !password || !role) {
    errorMsg.textContent = "⚠️ Please fill all fields including role.";
    return false;
  }

  if (role === "admin" && username === "admin" && password === "admin123") {
    window.location.href = "admin_dashboard.html";
    return false;
  } else if (role === "user" && username === "user" && password === "user123") {
    window.location.href = "user_dashboard.html";
    return false;
  } else {
    errorMsg.textContent = "❌ Invalid username, password, or role.";
    return false;
  }
}

function logout() {
  window.location.href = "login.html";
}