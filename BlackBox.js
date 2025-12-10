document.querySelectorAll(".accordion-header").forEach((header) => {
        header.addEventListener("click", () => {
          const content = header.nextElementSibling;

          // Toggle arrow
          header.classList.toggle("active");

          if (content.style.height && content.style.height !== "0px") {
            // Closing
            content.style.height = content.scrollHeight + "px"; // set fixed height first
            requestAnimationFrame(() => {
              content.style.height = "0px";
            });
          } else {
            // Opening
            const scrollHeight = content.scrollHeight;
            content.style.height = scrollHeight + "px";

            // After animation ends, remove fixed height so content can be responsive
            content.addEventListener(
              "transitionend",
              () => {
                if (header.classList.contains("active")) {
                  content.style.height = "auto";
                }
              },
              { once: true }
            );
          }
        });
      });

      document.addEventListener('DOMContentLoaded', () => {
    // 1. Calendar/Date Selection Logic (Mocked)
    const calendarDays = document.getElementById('calendarDays');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');

    // Simple function to generate days (for prototype visual)
    function renderDays() {
        // Clear placeholder days
        calendarDays.innerHTML = '';
        
        // Mock a 31-day month starting with a few previous month days
        const daysInMonth = 31;
        const today = 10; // Mock today's date as the 10th
        
        // Add placeholder previous month days for alignment (e.g., Dec 1 is a Friday)
        for (let i = 0; i < 5; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day', 'day-prev');
            // Mock days 27, 28, 29, 30, 1
            dayDiv.textContent = 27 + i; 
            calendarDays.appendChild(dayDiv);
        }

        // Add actual days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = i;
            
            if (i < today) {
                // Mark past days as unavailable
                dayDiv.classList.add('disabled-day');
                dayDiv.style.cursor = 'not-allowed';
                dayDiv.style.color = '#555555';
            }
            
            if (i === today) {
                dayDiv.classList.add('today', 'selected-day'); // Start with today selected
            }

            dayDiv.addEventListener('click', function() {
                if (this.classList.contains('disabled-day')) return; // Ignore past days

                // Remove selection from all days
                document.querySelectorAll('.day').forEach(d => {
                    d.classList.remove('selected-day');
                });

                // Add selection to the clicked day
                this.classList.add('selected-day');
                
                // Update the summary display (Mocking day name)
                const dayName = (i % 7 === 3) ? 'Wed' : 'Day'; // Simple mock
                selectedDateDisplay.textContent = `${dayName}, Dec ${i}`;
            });

            calendarDays.appendChild(dayDiv);
        }
    }

    renderDays();


    // 2. Time Slot Selection Logic
    const timeSlotsContainer = document.getElementById('timeSlots');
    const selectedTimeDisplay = document.getElementById('selectedTimeDisplay');
    
    // Set a default selected time on load
    const defaultTimeSlot = document.querySelector('.time-slot:not(.disabled)');
    if (defaultTimeSlot) {
        defaultTimeSlot.classList.add('selected-slot');
        selectedTimeDisplay.textContent = defaultTimeSlot.textContent;
    }


    timeSlotsContainer.addEventListener('click', function(event) {
        const clickedSlot = event.target.closest('.time-slot');
        
        if (clickedSlot && !clickedSlot.classList.contains('disabled')) {
            // Remove selection from all slots
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected-slot');
            });
            
            // Add selection to the clicked slot
            clickedSlot.classList.add('selected-slot');
            
            // Update the summary display
            selectedTimeDisplay.textContent = clickedSlot.textContent;
        }
    });


    // 3. Form Submission Handling (for prototype)
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the form from actually submitting (for prototype)

        // Gather data (optional, but good for showing functionality)
        const fullName = document.getElementById('fullName').value;
        const selectedDate = selectedDateDisplay.textContent;
        const selectedTime = selectedTimeDisplay.textContent;

        // Display a mock success message (or clear fields)
        alert(`Booking Confirmed!\n\nDetails:\nName: ${fullName}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\n(This is a prototype, data was not stored.)`);
        
        // Optional: Reset the form fields for a clean look after "submission"
        bookingForm.reset();
        
    });
});

