/**
 * Sugamya Sahayak - Accessible Application Engine (app.js)
 * WCAG 2.1 AA Compliant & n8n Grounded Workflow Connector
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 0. Safe text-escaping helper for all dynamic/user/backend-controlled
    //    content inserted via innerHTML. Never interpolate unescaped
    //    dynamic values into HTML strings -- always pass them through
    //    escapeHtml() first. Hardcoded, trusted structural HTML (the
    //    surrounding template markup itself) does not need escaping.
    // ------------------------------------------------------------------
    function escapeHtml(value) {
        if (value === null || value === undefined) return '';
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

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
                <p>Preparing reference guidance for <strong>${escapeHtml(payload.state)} (${escapeHtml(payload.district)})</strong>...</p>
            </div>
        `;

        announceToScreenReader('Preparing your reference guidance...');

        // NOTE: this backend endpoint is not currently connected to any live
        // n8n workflow (verified 2026-09-16/17: returns HTTP 404). Do not
        // assume a successful response means live AI/grounding is working
        // without re-verifying the endpoint first. isLive is set based on
        // whether this fetch actually succeeded, and controls the "live" vs
        // "offline reference" labeling shown to the user in renderResults().
        let data;
        let isLive = false;

        try {
            const response = await fetch('https://n8n.mukkubuilds.com/webhook/disability-guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => null);

            if (response && response.ok) {
                data = await response.json();
                isLive = true;
            } else {
                data = generateGroundedFallbackResponse(payload);
            }
        } catch (err) {
            data = generateGroundedFallbackResponse(payload);
        }

        renderResults(data, payload, isLive);
    });

    // ------------------------------------------------------------------
    // Offline reference content -- SOURCE-COMPLIANCE NOTICE (2026-09-17)
    // Every factual claim below must be traceable to a Reviewed source in
    // docs/SOURCES.md (SRC-001 to SRC-005). Do NOT add district hospital
    // names, disability-specific medical document lists, eligibility
    // percentages, fee amounts, or helpline numbers that are not
    // registered there -- a 2026-09-17 source-coverage review found and
    // removed several such unsupported claims that existed previously.
    // Each field below is commented with its exact source reference.
    // ------------------------------------------------------------------
    function generateGroundedFallbackResponse(p) {
        const isMaharashtra = p.state === 'MH';

        return {
            status: 'success',
            // SRC-005: user must be directed to the official lookup; the
            // product must not name a hospital or authority itself.
            authority: 'Your district\'s designated Medical Authority. Please use the official "Know your Medical Authority" lookup on swavlambancard.gov.in, selecting your state and district, to find the specific authority for your area.',
            // SRC-003: generic document categories only (no disability-
            // specific medical tests are named in any reviewed source).
            required_documents: 'Proof of identity, a recent photograph (not older than 6 months), proof of residence, and your Aadhaar number or Aadhaar enrolment number. If your Aadhaar reflects your current address, separate address proof is not required.',
            // SRC-003 states assessment happens under Central Government
            // guidelines; no reviewed source states a percentage benchmark.
            eligibility_benchmark: 'Eligibility is assessed by the medical authority under applicable Central Government guidelines. Please check the official portal or your State/District authority for current requirements.',
            // No reviewed source states a fee amount or "free" status.
            application_fee: 'Fee details are not confirmed in our reviewed sources. Please check the official UDID portal or your State/District authority for current fee information.',
            // SRC-002 (Maharashtra state-level escalation contact only,
            // presented with its required non-fixed caveat); no reviewed
            // source exists for other states.
            helpline: isMaharashtra
                ? 'State Commissioner for Persons with Disabilities, Maharashtra -- contact per depwd.maharashtra.gov.in (verify current details before use): Phone 020-2612 2061 / 020-2613 6845 / 020-2612 6471, Email commissioner.disability@maharashtra.gov.in'
                : 'Please check the official UDID portal (swavlambancard.gov.in) or your State/District authority for escalation contacts.',
            // SRC-001, SRC-005
            official_portal: 'https://swavlambancard.gov.in',
            next_steps: [
                // SRC-001, SRC-003
                '1. Register online at swavlambancard.gov.in with your Aadhaar number/enrolment ID, proof of identity, proof of residence, and a recent photograph.',
                // SRC-003, SRC-005
                '2. Your application is referred to the medical authority in your district of residence, or the medical authority at a hospital where you are being treated -- find yours using the official "Know your Medical Authority" lookup.',
                // SRC-001, SRC-003, SRC-004
                '3. The medical authority assesses your disability under Central Government guidelines; once approved, your certificate/UDID card is issued electronically and can be tracked, renewed, or downloaded via the portal.'
            ]
        };
    }

    function renderResults(data, payload, isLive) {
        const groundedBadge = document.getElementById('grounded-badge');
        if (isLive) {
            groundedBadge.textContent = 'Live Grounded Response';
            groundedBadge.className = 'badge badge-verified';
        } else {
            groundedBadge.textContent = 'Offline Reference Content';
            groundedBadge.className = 'badge badge-offline';
        }

        const sourceNotice = isLive
            ? ''
            : `<div class="result-box offline-notice"><p><strong>⚠️ Offline reference content:</strong> this response was generated from pre-written local reference data, not a live AI/grounding backend. The live backend connection is not currently available.</p></div>`;

        const stateLabel = payload.state === 'MH' ? 'Maharashtra' : payload.state;
        resultsBody.innerHTML = `
            <div class="results-content">
                ${sourceNotice}
                <div class="result-box">
                    <h4>🏛️ Designated Authority & Medical Board</h4>
                    <p><strong>${escapeHtml(data.authority)}</strong></p>
                    <p>State: <strong>${escapeHtml(stateLabel)}</strong> | District: <strong>${escapeHtml(payload.district.toUpperCase())}</strong></p>
                </div>

                <div class="result-box">
                    <h4>📜 Mandatory Required Documents</h4>
                    <p>${escapeHtml(data.required_documents)}</p>
                </div>

                <div class="result-box">
                    <h4>⚖️ Eligibility Benchmark & Fee</h4>
                    <p><strong>Benchmark:</strong> ${escapeHtml(data.eligibility_benchmark)}</p>
                    <p><strong>Application Fee:</strong> ${escapeHtml(data.application_fee)}</p>
                </div>

                <div class="result-box">
                    <h4>📌 Next Steps to Apply</h4>
                    <ol class="next-steps-list">
                        ${data.next_steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
                    </ol>
                </div>

                <div class="result-box emergency-box">
                    <h4>🚨 Need Escalation or Support?</h4>
                    <p><strong>${escapeHtml(data.helpline)}</strong></p>
                    <a href="${escapeHtml(data.official_portal)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit Official UDID Portal ↗</a>
                </div>
            </div>
        `;

        announceToScreenReader(isLive
            ? 'Live grounded guidance report generated. Review the designated medical board and document checklist below.'
            : 'Offline reference guidance report generated. This is pre-written reference content, not a live AI response. Review the designated medical board and document checklist below.');
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
        const typingEl = appendMessage('assistant', 'Looking up reference information...');

        // NOTE: same live/offline distinction as the wizard submit handler
        // above -- this endpoint is not currently connected (verified
        // 2026-09-16/17: HTTP 404). isLive reflects the actual fetch result.
        // SRC-001, SRC-005: only sourced default fallback text below --
        // no invented helpline number or fee/eligibility claim.
        let botReply = 'Please check the official UDID portal (swavlambancard.gov.in) or your State/District authority for further assistance.';
        let isLive = false;

        try {
            const res = await fetch('https://n8n.mukkubuilds.com/webhook/disability-guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: localStorage.getItem('sugamya_session_id') || `chat_${Date.now()}`,
                    user_query: text
                })
            }).catch(() => null);

            if (res && res.ok) {
                const data = await res.json();
                botReply = data.output || data.message || botReply;
                isLive = true;
            } else {
                if (text.toLowerCase().includes('help') || text.toLowerCase().includes('stuck') || text.toLowerCase().includes('emergency')) {
                    // SRC-002 (Maharashtra state-level contact, with its
                    // required non-fixed caveat) + SRC-001/SRC-005 portal.
                    botReply = 'If you need urgent assistance, please check the official UDID portal (swavlambancard.gov.in) or contact your State/District authority. For Maharashtra, the State Commissioner for Persons with Disabilities can be reached via contact details listed on depwd.maharashtra.gov.in (verify current details before use).';
                } else {
                    // SRC-001, SRC-003, SRC-005 -- no fee/eligibility
                    // percentage claim, since none is sourced.
                    botReply = `Regarding your query "${text}": please check the official UDID portal (swavlambancard.gov.in) for current application steps, required documents, and eligibility assessment details, or contact your State/District authority.`;
                }
            }
        } catch (e) {
            isLive = false;
        }

        const label = isLive ? 'Sugamya Assistant' : 'Sugamya Assistant (Offline Reference — not a live AI response)';
        typingEl.innerHTML = `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(botReply)}`;
        announceToScreenReader(`Assistant replied: ${botReply}`);
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = sender === 'user' ? `<strong>You:</strong> ${escapeHtml(text)}` : `<strong>Sugamya Assistant:</strong> ${escapeHtml(text)}`;
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
