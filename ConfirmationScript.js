document.addEventListener('DOMContentLoaded', () => {
    const receiptBox = document.getElementById('receiptBox');
    const placeholder = document.getElementById('receiptPlaceholder');
    const dataJSON = sessionStorage.getItem('bookingReceipt');
    
    if (receiptBox) {
        if (dataJSON) {
            const data = JSON.parse(dataJSON);

            if (placeholder) {
                receiptBox.removeChild(placeholder);
            }

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
            sessionStorage.removeItem('bookingReceipt'); 

        }
    }
});