const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const systemRole = document.getElementById("role").value;
  const userQuery = document.getElementById("user-query").value;

  const formData = {
    systemRole: systemRole,
    userQuery: userQuery,
  };

  fetch("http://localhost:8000/ask-claude", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log("Response Status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Server:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
