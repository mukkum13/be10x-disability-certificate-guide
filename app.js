/**
 * Sugamya Sahayak - Accessible Application Engine (app.js)
 * WCAG 2.1 AA Compliant & n8n Grounded Workflow Connector
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 1. Accessibility State & Theme Controllers
    // ------------------------------------------------------------------
    const btnThemeToggle = document.getElementById('btn-theme-toggle');
    const btnFontNormal = document.getElementById('btn-font-normal');
    const btnFontLarge = document.getElementById('btn-font-large');
    const btnFontXlarge = document.getElementById('btn-font-xlarge');

    // Load saved preferences
    const savedTheme = localStorage.getItem('sugamya_theme') || 'default';
    const savedFont = localStorage.getItem('sugamya_font') || 'normal';

    applyTheme(savedTheme);
    applyFontSize(savedFont);

    btnThemeToggle.addEventListener('click', () => {
        const isHighContrast = document.body.classList.contains('theme-high-contrast');
        const newTheme = isHighContrast ? 'default' : 'high-contrast';
        applyTheme(newTheme);
    });

    btnFontNormal.addEventListener('click', () => applyFontSize('normal'));
    btnFontLarge.addEventListener('click', () => applyFontSize('large'));
    btnFontXlarge.addEventListener('click', () => applyFontSize('xlarge'));

    function applyTheme(theme) {
        if (theme === 'high-contrast') {
            document.body.classList.add('theme-high-contrast');
            btnThemeToggle.setAttribute('aria-pressed', 'true');
        } else {
            document.body.classList.remove('theme-high-contrast');
            btnThemeToggle.setAttribute('aria-pressed', 'false');
        }
        localStorage.setItem('sugamya_theme', theme);
    }

    function applyFontSize(size) {
        document.body.classList.remove('font-normal', 'font-large', 'font-xlarge');
        document.body.classList.add(`font-${size}`);

        [btnFontNormal, btnFontLarge, btnFontXlarge].forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        if (size === 'normal') {
            btnFontNormal.classList.add('active');
            btnFontNormal.setAttribute('aria-pressed', 'true');
        } else if (size === 'large') {
            btnFontLarge.classList.add('active');
            btnFontLarge.setAttribute('aria-pressed', 'true');
        } else if (size === 'xlarge') {
            btnFontXlarge.classList.add('active');
            btnFontXlarge.setAttribute('aria-pressed', 'true');
        }
        localStorage.setItem('sugamya_font', size);
    }

    // ------------------------------------------------------------------
    // 2. Multi-Step Wizard Engine (Steps 1 to 5)
    // ------------------------------------------------------------------
    const wizardForm = document.getElementById('wizard-form');
    const formSteps = document.querySelectorAll('.form-step');
    const progressTrack = document.querySelector('.progress-fill');
    const progressBar = document.getElementById('wizard-progress');
    const stepCountLabel = document.getElementById('step-count-label');
    const stepTitleLabel = document.getElementById('step-title-label');

    const stepTitles = {
        1: 'Select Your State',
        2: 'Select Your District',
        3: 'Select Disability Category',
        4: 'Select Application Status',
        5: 'Specific Question or Guidance'
    };

    let currentStepNum = 1;

    // Handle "Next" button clicks
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nextStepId = e.target.getAttribute('data-next');
            const targetStepNum = parseInt(nextStepId.replace('step-', ''), 10);
            
            if (validateStep(currentStepNum)) {
                navigateToStep(targetStepNum);
            }
        });
    });

    // Handle "Back" button clicks
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prevStepId = e.target.getAttribute('data-prev');
            const targetStepNum = parseInt(prevStepId.replace('step-', ''), 10);
            navigateToStep(targetStepNum);
        });
    });

    function validateStep(stepNum) {
        const stepEl = document.getElementById(`step-${stepNum}`);
        const requiredInputs = stepEl.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('error');
                input.focus();
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            announceToScreenReader(`Please select a required option before moving to the next step.`);
        }
        return isValid;
    }

    function navigateToStep(stepNum) {
        formSteps.forEach(step => {
            step.hidden = true;
            step.classList.remove('active');
        });

        const activeStep = document.getElementById(`step-${stepNum}`);
        activeStep.hidden = false;
        activeStep.classList.add('active');

        currentStepNum = stepNum;

        // Update progress bar
        const progressPercentage = (stepNum / 5) * 100;
        progressTrack.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        progressBar.setAttribute('aria-valuetext', `Step ${stepNum} of 5: ${stepTitles[stepNum]}`);

        stepCountLabel.textContent = `Step ${stepNum} of 5`;
        stepTitleLabel.textContent = stepTitles[stepNum];

        // Focus heading for accessibility
        const heading = activeStep.querySelector('h3');
        if (heading) heading.focus();

        announceToScreenReader(`Navigated to Step ${stepNum}: ${stepTitles[stepNum]}`);
    }

    // ------------------------------------------------------------------
    // 3. Form Submission & n8n Grounded Guidance Generator
    // ------------------------------------------------------------------
    const resultsSection = document.getElementById('results-section');
    const resultsBody = document.getElementById('results-body');

    wizardForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(wizardForm);
        const payload = {
            session_id: localStorage.getItem('sugamya_session_id') || `web_${Date.now()}`,
            state: formData.get('state') || 'MH',
            district: formData.get('district') || 'pune',
            disability_type: formData.get('disability_type') || 'locomotor',
            app_status: formData.get('app_status') || 'new',
            user_query: formData.get('user_query') || ''
        };

        localStorage.setItem('sugamya_session_id', payload.session_id);

        // Show loading state
        resultsSection.hidden = false;
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        resultsBody.innerHTML = `
            <div class="loading-spinner" role="status" aria-live="polite">
                <span class="spinner" aria-hidden="true">⏳</span>
                <p>Retrieving official government sources & medical board guidelines for <strong>${payload.state} (${payload.district})</strong>...</p>
            </div>
        `;

        announceToScreenReader('Processing your request. Retrieving grounded official guidelines...');

        try {
            // Attempt live fetch to n8n webhook backend
            const response = await fetch('https://n8n.mukkubuilds.com/webhook/disability-guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => null);

            let data;
            if (response && response.ok) {
                data = await response.json();
            } else {
                // Fallback to grounded local official knowledge base
                data = generateGroundedFallbackResponse(payload);
            }

            renderResults(data, payload);

        } catch (err) {
            const fallbackData = generateGroundedFallbackResponse(payload);
            renderResults(fallbackData, payload);
        }
    });

    function generateGroundedFallbackResponse(p) {
        const districtNames = {
            'pune': 'Pune District Social Welfare Office & Civil Hospital Board',
            'mumbai_city': 'Mumbai City Medical Board (JJ Hospital Campus)',
            'mumbai_suburban': 'Mumbai Suburban Welfare Board (Cooper Hospital)',
            'nagpur': 'Nagpur District Medical Board & Civil Hospital',
            'nashik': 'Nashik District Civil Hospital',
            'thane': 'Thane District Hospital Welfare Board'
        };

        const disabilityDocs = {
            'locomotor': 'X-Ray reports, orthopaedic surgeon evaluation, clinical photographs, Aadhaar Card, 2 Passport photos.',
            'visual': 'Ophthalmologist visual acuity test report, fundus examination, Aadhaar Card, 2 Passport photos.',
            'hearing': 'Audiogram test report by ENT specialist, BERA test report (if applicable), Aadhaar Card, 2 Passport photos.',
            'intellectual': 'IQ assessment report by certified Clinical Psychologist, developmental history, Aadhaar Card, 2 Passport photos.'
        };

        return {
            status: 'success',
            grounded_source: 'SRC-001 (NIEPID National UDID) & SRC-002 (Govt. of Maharashtra Disability Commissioner)',
            authority: districtNames[p.district] || 'District Social Welfare Office / Civil Surgeon Medical Board',
            disability_category: p.disability_type.toUpperCase(),
            eligibility_benchmark: '40% or higher certified disability benchmark required for UDID card benefits.',
            required_documents: disabilityDocs[p.disability_type] || 'Aadhaar Card, Medical assessment reports, 2 Passport photos.',
            application_fee: 'Free of Cost (Govt. of India / Govt. of Maharashtra Mandate)',
            helpline: '1800-11-1250 (Toll-Free National UDID Helpline)',
            official_portal: 'https://swavlambancard.gov.in',
            next_steps: [
                '1. Register online at swavlambancard.gov.in with your Aadhaar card and photo.',
                '2. Select your designated District Civil Hospital / Medical Board for physical assessment.',
                '3. Attend assessment date; medical board will issue digital UDID card upon evaluation.'
            ]
        };
    }

    function renderResults(data, payload) {
        resultsBody.innerHTML = `
            <div class="results-content">
                <div class="result-box">
                    <h4>🏛️ Designated Authority & Medical Board</h4>
                    <p><strong>${data.authority}</strong></p>
                    <p>State: <strong>${payload.state === 'MH' ? 'Maharashtra' : payload.state}</strong> | District: <strong>${payload.district.toUpperCase()}</strong></p>
                </div>

                <div class="result-box">
                    <h4>📜 Mandatory Required Documents</h4>
                    <p>${data.required_documents}</p>
                </div>

                <div class="result-box">
                    <h4>⚖️ Eligibility Benchmark & Fee</h4>
                    <p><strong>Benchmark:</strong> ${data.eligibility_benchmark}</p>
                    <p><strong>Application Fee:</strong> ${data.application_fee}</p>
                </div>

                <div class="result-box">
                    <h4>📌 Next Steps to Apply</h4>
                    <ol class="next-steps-list">
                        ${data.next_steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>

                <div class="result-box emergency-box">
                    <h4>🚨 Need Emergency Helpline Support?</h4>
                    <p>Contact State Commissioner for Persons with Disabilities Helpline: <strong>${data.helpline}</strong></p>
                    <a href="${data.official_portal}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit Official UDID Portal ↗</a>
                </div>
            </div>
        `;

        announceToScreenReader('Grounded Guidance Report generated successfully. Review the designated medical board and document checklist below.');
    }

    // ------------------------------------------------------------------
    // 4. Live Chat Assistant (Gemini Sub-Node Connection)
    // ------------------------------------------------------------------
    const chatInput = document.getElementById('chat-input');
    const btnSendChat = document.getElementById('btn-send-chat');
    const chatMessages = document.getElementById('chat-messages');

    btnSendChat.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    async function sendChatMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        appendMessage('user', text);
        chatInput.value = '';

        // Show bot typing
        const typingEl = appendMessage('assistant', 'Thinking (Gemini AI)...');

        try {
            const res = await fetch('https://n8n.mukkubuilds.com/webhook/disability-guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: localStorage.getItem('sugamya_session_id') || `chat_${Date.now()}`,
                    user_query: text
                })
            }).catch(() => null);

            let botReply = 'Emergency Helpline: For urgent assistance in Maharashtra, contact District Social Welfare Office or State Commissioner for Persons with Disabilities Helpline: 1800-11-1250 / https://swavlambancard.gov.in';

            if (res && res.ok) {
                const data = await res.json();
                botReply = data.output || data.message || botReply;
            } else {
                if (text.toLowerCase().includes('help') || text.toLowerCase().includes('stuck') || text.toLowerCase().includes('emergency')) {
                    botReply = '🚨 Emergency Help: Call Toll-Free 1800-11-1250 (State Commissioner for Persons with Disabilities) or visit swavlambancard.gov.in.';
                } else {
                    botReply = `Regarding your query "${text}": Official UDID applications are 100% free at swavlambancard.gov.in. Minimum 40% certified disability required for government benefits.`;
                }
            }

            typingEl.innerHTML = `<strong>Sugamya Assistant:</strong> ${botReply}`;
            announceToScreenReader(`Assistant replied: ${botReply}`);

        } catch (e) {
            typingEl.innerHTML = `<strong>Sugamya Assistant:</strong> Emergency Helpline: 1800-11-1250 / swavlambancard.gov.in`;
        }
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = sender === 'user' ? `<strong>You:</strong> ${text}` : `<strong>Sugamya Assistant:</strong> ${text}`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv;
    }

    // ARIA Live Announcement Helper
    function announceToScreenReader(message) {
        let liveRegion = document.getElementById('a11y-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'a11y-live-region';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = message;
    }
});
