const submitBtn = document.getElementById("submit-btn");
const answerMiniContainer = document.querySelector(".btn");

answerMiniContainer.addEventListener("click", async function (event) {
  event.preventDefault();

  // Remove Previous Responses if any
  removePreviousResponse();

  // Create a tile for loading
  const waitingFunny = createLoadingSection();
  // Create Loading Text
  const loadingText = createLoadingText();

  // Removing the reply gif button
  if (submitBtn) {
    submitBtn.remove();
  }

  // Now adding the loading title
  answerMiniContainer.appendChild(waitingFunny);
  // Adding Loading Text
  answerMiniContainer.appendChild(loadingText);

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

      // Process the Data

      // Creating an ask again button
      const askAgain = createAskAgain();

      // Firstly removing the existing GIFs
      if (waitingFunny && loadingText) {
        waitingFunny.remove();
        loadingText.remove();
      }

      // Then, adding the anymore-questions GIF
      answerMiniContainer.appendChild(askAgain);

      // Creating a Dynamic Section for LLM Response generated from Server
      const responseElement = document.createElement("section");
      responseElement.className = "response-container";

      // Creating a Paragraph element for regular text
      const textElement = document.createElement("p");

      // Assigning text from server to the paragraph element
      textElement.textContent = data;
      // textElement.style.whiteSpace = "pre";

      // Apending Paragraph element into the Section Element
      responseElement.appendChild(textElement);

      // Appending the Answer Section formed into the parent DIV Container
      document.body.appendChild(responseElement);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const removePreviousResponse = function () {
  if (document.querySelector(".response-container")) {
    document.querySelector(".response-container").remove();
  }
};

const createLoadingSection = function () {
  const loadingEl = document.createElement("section");
  loadingEl.className = "loading-section";

  // Now, let's create the funny waiting image-gif while the server responds!
  const waitingFunny = document.createElement("img");
  waitingFunny.className = "waiting-funny";
  waitingFunny.src = "gifs/waiting-bear.gif";
  waitingFunny.width = 350;
  waitingFunny.alt =
    "A kyot bear waiting for response while the server taketh it's time";

  return waitingFunny;
};

const createLoadingText = function () {
  const loadingText = document.createElement("p");
  loadingText.className = "waiting-text";
  loadingText.textContent = "Waiting...";
  return loadingText;
};

const createAskAgain = function () {
  const askAgain = document.createElement("img");
  askAgain.src = "gifs/anymore-questions.gif";
  askAgain.width = 230;
  askAgain.alt = "A Gif depicting whether you want to ask more questions";
  askAgain.className = "anymore-questions";

  askAgain.addEventListener("click", function () {
    location.reload();
  });

  return askAgain;
};

const processData = function (data) {};
