document.getElementById('verificationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Form ko default submit hone se rokta hai

    // 1. Inputs ko fetch karna
    const internName = document.getElementById('internName').value.trim();
    const internId = document.getElementById('internId').value.trim().toUpperCase(); // ID ko uppercase mein convert karna standard practice hai
    const completionDate = document.getElementById('completionDate').value;
    const messageArea = document.getElementById('message');

    // Message area ko reset karna
    messageArea.style.display = 'none';
    messageArea.className = 'message-area';
    messageArea.innerHTML = '';

    // 2. Data Map (Yah database ki tarah kaam karega)
    // **** YAHAN PAR APNE INTERNS KI DETAILS DAALEIN ****
    const internCertificateMap = {
        // Format: "INTERN_ID": "GOOGLE_DRIVE_LINK_FOR_CERTIFICATE"
        "INTERN202502": "https://drive.google.com/file/d/1iBx7J9e7JJEI1Bhq-jOVZKdOWL36NQ3m/view?usp=sharing",
        "INTERN202525": "https://drive.google.com/file/d/19xu7Btr_YCSVXwyye2LtZYk1mt9VY1vU/view?usp=sharing",
        "INTERN202581": "https://drive.google.com/file/d/1PSJOusIjRD3kYUbNq59oOcwVSxhC0adz/view?usp=sharing",
        "INTERN202582": "https://drive.google.com/file/d/1XSffomJtgykIfGehA8IugFDiyvqCwlYN/view?usp=sharing",
        "INTERN202580": "https://drive.google.com/file/d/11WvOSBAgyanq_OfFC2-reldkiLFGgsTl/view?usp=sharing",// Example Link
       
        // Note: Google Drive ke direct download link use karne se user file turant download kar payega.
    };

    // 3. Validation aur Lookup
    if (!internName || !internId || !completionDate) {
        showMessage('Please fill in all the required fields.', 'error');
        return;
    }

    if (internCertificateMap.hasOwnProperty(internId)) {
        // ID mil gayi! Redirection ki taiyari
        const certificateLink = internCertificateMap[internId];

        showMessage(`Success! Hello ${internName}, your certificate is being downloaded now.`, 'success');

        // Certificate download/redirect mein thoda delay lagana
        setTimeout(() => {
            window.location.href = certificateLink;

            // Note: window.location.href use karne se page change ho jayega aur QR link permanent rahega.
            // QR code mein is verification page ka link daalein, aur jab user ID daalega to yeh JS use uss Drive link par bhej dega.
        }, 1500); // 1.5 second ka delay

    } else {
        // ID nahi mili
        showMessage('Verification failed. The Intern ID provided does not match our records or the certificate is not yet ready. Please check the details or contact Hafor Tech support.', 'error');
    }
});


function showMessage(message, type) {
    const messageArea = document.getElementById('message');
    messageArea.innerHTML = message;
    messageArea.style.display = 'block';
    messageArea.classList.add(type);

}





