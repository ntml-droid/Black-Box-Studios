gsap.registerPlugin(ScrollTrigger);
const swup = new Swup();

// Check theme immediately on script load to prevent "flashing"
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

// --------------------------------------------------------
// 1. COMPONENT FUNCTIONS
// --------------------------------------------------------

function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.onclick = () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    };
}

function initGlobalAnimations() {
    const whiteBox = document.querySelector('.box');
    if (!whiteBox) return;

    let scrollTimeout;
    ScrollTrigger.create({
        onUpdate: (self) => {
            const velocity = self.getVelocity();
            let dipAmount = velocity / 30;

            if (dipAmount > 0) dipAmount = Math.min(dipAmount, 60); 
            else dipAmount = Math.max(dipAmount, -300);

            gsap.to(whiteBox, {
                y: dipAmount, 
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto"
            });

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                gsap.to(whiteBox, {
                    y: 0, 
                    duration: 1.8, 
                    ease: "elastic.out(1, 0.4)", 
                });
            }, 100); 
        }
    });
}

function initCarousel() {
    const pinSpacer = document.querySelector('.pin-spacer');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const whiteBox = document.querySelector('.box'); 
    
    if (!carouselWrapper || !pinSpacer) return;

    const pinEndMultiplier = 3.5; 
    const totalMovement = carouselWrapper.scrollWidth - window.innerWidth;
    
    ScrollTrigger.create({
        trigger: pinSpacer, 
        pin: true,           
        start: "top top", 
        end: `+=${totalMovement * pinEndMultiplier}`, 
        scrub: 1, 
        animation: gsap.to(carouselWrapper, {
            x: -(totalMovement * 1.8),
            ease: "none",
            force3D: true 
        })
    });

    if (whiteBox) {
        gsap.to(whiteBox, {          
            rotation: 360,      
            scrollTrigger: {
                trigger: pinSpacer, 
                start: "top top",
                end: `+=${totalMovement * pinEndMultiplier}`, 
                scrub: 2.5,         
            }
        });
    }
}

// --------------------------------------------------------
// 2. MAIN INITIALIZATION (Runs on load and Swup replace)
// --------------------------------------------------------

function initializePageContent() {
    // 1. Kill old triggers to prevent memory leaks and "ghost" animations
    ScrollTrigger.getAll().forEach(t => t.kill());

    // 2. Restart animations and theme listener
    initGlobalAnimations();
    initCarousel();
    initTheme();
    
    // 3. Accordion logic
    document.querySelectorAll(".accordion-header").forEach((header) => {
        header.onclick = () => {
            const content = header.nextElementSibling;
            header.classList.toggle("active");
            if (content.style.height && content.style.height !== "0px") {
                content.style.height = content.scrollHeight + "px"; 
                requestAnimationFrame(() => content.style.height = "0px");
            } else {
                content.style.height = content.scrollHeight + "px";
                content.ontransitionend = () => { 
                    if (header.classList.contains("active")) content.style.height = "auto"; 
                };
            }
        };
    });

    // 4. Calendar logic
    const calendarDays = document.getElementById('calendarDays');
    if (calendarDays) {
        calendarDays.innerHTML = '';
        const today = 10; 
        for (let i = 1; i <= 31; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = i;
            if (i < today) dayDiv.classList.add('disabled-day');
            if (i === today) dayDiv.classList.add('today', 'selected-day');
            
            dayDiv.onclick = () => {
                if (dayDiv.classList.contains('disabled-day')) return;
                document.querySelectorAll('.day').forEach(d => d.classList.remove('selected-day'));
                dayDiv.classList.add('selected-day');
                const display = document.getElementById('selectedDateDisplay');
                if (display) display.textContent = `Day, Dec ${i}`;
            };
            calendarDays.appendChild(dayDiv);
        }
    }

    // 5. Loading spinners
    const imageWrappers = document.querySelectorAll('.photo-loading-wrapper');
    imageWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        if (!img) return;
        const setLoaded = () => wrapper.setAttribute('data-loaded', 'true');
        if (img.complete && img.naturalWidth > 0) setLoaded();
        else {
            img.addEventListener('load', setLoaded);
            img.addEventListener('error', setLoaded);
        }
    });
}

// --------------------------------------------------------
// 3. EXECUTION
// --------------------------------------------------------

initializePageContent(); 

swup.hooks.on('content:replace', () => {
    initializePageContent(); 
    setTimeout(() => {
        ScrollTrigger.refresh();
        window.scrollTo(0, 0); 
    }, 150);
});

document.addEventListener('submit', (e) => {
    if (e.target.id === 'multiStepForm') {
        const date = document.getElementById('selectedDateDisplay')?.textContent;
        const time = document.getElementById('selectedTimeDisplay')?.textContent;
        const receiptData = { 
            date, 
            time, 
            fullName: document.getElementById('fullName')?.value,
            email: document.getElementById('email')?.value 
        };
        sessionStorage.setItem('bookingReceipt', JSON.stringify(receiptData));
    }
});





