const swup = new Swup();

// 2. Define the function that binds all your listeners
function initializePageContent() {
    // --- 1. Accordion Logic ---
    // The querySelectorAll will find the elements in the *new* page content.
    document.querySelectorAll(".accordion-header").forEach((header) => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            header.classList.toggle("active");
            
            // ... (rest of your accordion logic) ...
            if (content.style.height && content.style.height !== "0px") {
                content.style.height = content.scrollHeight + "px"; 
                requestAnimationFrame(() => {
                    content.style.height = "0px";
                });
            } else {
                const scrollHeight = content.scrollHeight;
                content.style.height = scrollHeight + "px";

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

    // --- 2. Calendar and Booking Logic ---
    const calendarDays = document.getElementById('calendarDays');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');
    const timeSlotsContainer = document.getElementById('timeSlots');
    const selectedTimeDisplay = document.getElementById('selectedTimeDisplay');
    const bookingForm = document.getElementById('bookingForm');


    // **CRITICAL:** Use an if-check to prevent errors on pages that don't have the elements (e.g., the Home or Contact page).
    if (calendarDays && timeSlotsContainer) {
        
        // Make sure to define renderDays inside this function if it's used here, 
        // or just put the logic directly if it's not reused elsewhere.
        function renderDays() {
            // ... (Your renderDays function code goes here) ...
            
            calendarDays.innerHTML = '';
            const daysInMonth = 31;
            const today = 10; 
            
            for (let i = 0; i < 5; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day', 'day-prev');
                dayDiv.textContent = 27 + i; 
                calendarDays.appendChild(dayDiv);
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = i;
                
                if (i < today) {
                    dayDiv.classList.add('disabled-day');
                    dayDiv.style.cursor = 'not-allowed';
                    dayDiv.style.color = '#555555';
                }
                
                if (i === today) {
                    dayDiv.classList.add('today', 'selected-day'); 
                }

                dayDiv.addEventListener('click', function() {
                    if (this.classList.contains('disabled-day')) return;

                    document.querySelectorAll('.day').forEach(d => {
                        d.classList.remove('selected-day');
                    });

                    this.classList.add('selected-day');
                    
                    const dayName = (i % 7 === 3) ? 'Wed' : 'Day'; 
                    if (selectedDateDisplay) {
                        selectedDateDisplay.textContent = `${dayName}, Dec ${i}`;
                    }
                });

                calendarDays.appendChild(dayDiv);
            }
        }

        renderDays(); // Run the function to create and attach listeners to days

        // ... (rest of timeSlots logic) ...
        const defaultTimeSlot = document.querySelector('.time-slot:not(.disabled)');
        if (defaultTimeSlot) {
            defaultTimeSlot.classList.add('selected-slot');
            if (selectedTimeDisplay) {
                selectedTimeDisplay.textContent = defaultTimeSlot.textContent;
            }
        }


        timeSlotsContainer.addEventListener('click', function(event) {
            const clickedSlot = event.target.closest('.time-slot');
            
            if (clickedSlot && !clickedSlot.classList.contains('disabled')) {
                document.querySelectorAll('.time-slot').forEach(slot => {
                    slot.classList.remove('selected-slot');
                });
                
                clickedSlot.classList.add('selected-slot');
                
                if (selectedTimeDisplay) {
                    selectedTimeDisplay.textContent = clickedSlot.textContent;
                }
            }
        });
    }

    // 3. Form Submission Handling
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // ... (rest of your form logic) ...
        });
    }
}




// 3. Call the function immediately on initial load.
initializePageContent(); 

// 4. Call the function again every time Swup replaces the content.
swup.hooks.on('content:replace', initializePageContent);

