<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize the input data to prevent XSS attacks
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);
    
    // Check if the resume checkbox is checked
    $resumeRequest = isset($_POST["resume"]) ? "Yes, they requested your resume." : "No, they did not request your resume.";

    // Your email address (where the form will be sent)
    $to = "liz.k.pao@gmail.com";  // Replace with your email address
    $subject = "Portfolio Contact Form Submission";

    // Construct the email body
    $body = "
    Name: $name\n
    Email: $email\n
    Message: $message\n
    Resume Request: $resumeRequest\n
    ";

    // Set email headers
    $headers = "From: $email\r\nReply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect the user back to the main page with a success message
        header("Location: index.html?success=1");
        exit();
    } else {
        // Redirect the user back to the main page with an error message
        header("Location: index.html?error=1");
        exit();
    }
}
?>
