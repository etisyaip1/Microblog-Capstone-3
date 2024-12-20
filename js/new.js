document.addEventListener("DOMContentLoaded", () => {
  const sendTextButton = document.getElementById("sendTextButton");
  const textInput = document.getElementById("textInput");

  // Ensure elements are properly selected
  console.log("Send Text Button:", sendTextButton);
  console.log("Text Input:", textInput);

  // Event listener for the send button
  sendTextButton.addEventListener("click", async () => {
    const messageText = textInput.value.trim(); // Get input value and trim whitespace
    if (!messageText) {
      alert("Message cannot be empty.");
      return;
    }

    try {
      // Call the sendText function to post the message
      const response = await sendText(messageText);
      console.log("API Response:", response);

      // Check if the response contains an error
      if (!response || response.error) {
        alert("Failed to send message. Please try again.");
        return;
      }

      // Success message and redirect
      alert("Message sent successfully.");
      window.location.href = "messages.html";
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message.");
    }
  });
});
