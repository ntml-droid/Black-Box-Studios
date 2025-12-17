document.addEventListener('DOMContentLoaded', () => {
    const receiptBox = document.getElementById('receiptBox');
    const placeholder = document.getElementById('receiptPlaceholder');
    const dataJSON = sessionStorage.getItem('bookingReceipt');
    
    if (receiptBox) {
        
        // --- A. CHECK FOR REAL DATA (After form submission) ---
        if (dataJSON) {
            const data = JSON.parse(dataJSON);

            // 1. Remove the static placeholder (if it exists)
            if (placeholder) {
                receiptBox.removeChild(placeholder);
            }

            // 2. Inject the dynamic receipt structure
            receiptBox.innerHTML = `
                <div class="receipt-section">
                    <h3>Booking Details</h3>
                    <p><strong>Service:</strong> Dark Room Rental ($25/Hr)</p>
                    <p><strong>Date:</strong> ${data.date}</p>
                    <p><strong>Time Slot:</strong> ${data.time}</p>
                    <p><strong>Project Type:</strong> ${data.projectType}</p>
                </div>
                
                <div class="receipt-section contact-info">
                    <h3>Contact Information</h3>
                    <p><strong>Full Name:</strong> ${data.fullName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                </div>
                
                <div class="receipt-note">
                    <p>A confirmation email with payment details has been sent to ${data.email}.</p>
                </div>
            `;
            
            // 3. Clean up the storage
            sessionStorage.removeItem('bookingReceipt'); 

        } 
        
        // --- B. NO REAL DATA FOUND ---
        // If the user navigates here directly, the placeholder stays, 
        // allowing you to inspect the CSS.
    }
});