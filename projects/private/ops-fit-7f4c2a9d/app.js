(() => {
  'use strict';

  const FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSfiGGAexOd2cDqvz0eILXZhF9ivGWPmrkeSEewzIruvGRRn7A/formResponse';

  const FORM_ENTRIES = {
    businessName: 'entry.1099438343',
    email: 'entry.240006433',
    report: 'entry.1165029023',
  };

  const dimensions = {
    workflow: { label: 'Workflow signal', order: 0 },
    process: { label: 'Process readiness', order: 1 },
    data: { label: 'Data & measurement', order: 2 },
    control: { label: 'Operating fit', order: 3 },
  };

  const questions = [
    {
      id: 'frequency',
      dimension: 'workflow',
      kicker: 'Checkpoint 01 · Repetition',
      title: 'How often does the candidate workflow happen?',
      copy: 'Think about one specific process—not the whole company. Recurring work creates enough repetitions to measure whether automation helps.',
      options: [
        { label: 'Once or only when something unusual happens', detail: 'A one-off task is difficult to justify as a first automation pilot.', points: 0, flag: 'The workflow is currently one-off or too rare to measure.' },
        { label: 'Monthly or a few times per quarter', detail: 'There may be value, but learning cycles will be slow.', points: 1 },
        { label: 'Every week', detail: 'Enough repetition to establish a baseline and compare outcomes.', points: 3 },
        { label: 'Every day or many times per day', detail: 'A strong signal when the work is also stable and reviewable.', points: 4 },
      ],
    },
    {
      id: 'effort',
      dimension: 'workflow',
      kicker: 'Checkpoint 02 · Operational weight',
      title: 'How much human time does it consume in a typical week?',
      copy: 'Include collecting inputs, checking records, handling exceptions, preparing the output, and review—not only the obvious typing time.',
      options: [
        { label: 'Less than one hour', detail: 'There may not be enough operational weight for a custom pilot.', points: 0, flag: 'The current time burden may be too small for a custom first pilot.' },
        { label: 'One to two hours', detail: 'Worth mapping if mistakes or delays are expensive.', points: 2 },
        { label: 'Three to five hours', detail: 'A meaningful recurring cost with room to measure improvement.', points: 3 },
        { label: 'More than five hours', detail: 'A strong value signal if the process can be bounded safely.', points: 4 },
      ],
    },
    {
      id: 'stability',
      dimension: 'process',
      kicker: 'Checkpoint 03 · Process shape',
      title: 'How predictable is the way the work gets done?',
      copy: 'Automation does not require a perfect process, but it needs a recognizable happy path and a manageable set of exceptions.',
      options: [
        { label: 'It is reinvented every time', detail: 'The process needs discovery and stabilization before implementation.', points: 0, flag: 'The process changes too much from run to run.' },
        { label: 'There is a pattern, but it lives in people’s heads', detail: 'A workflow map could expose a viable first boundary.', points: 2 },
        { label: 'The main steps repeat; exceptions vary', detail: 'Often a good fit for assisted work with human escalation.', points: 3 },
        { label: 'The process and common exceptions are documented', detail: 'Strong implementation readiness.', points: 4 },
      ],
    },
    {
      id: 'ownership',
      dimension: 'process',
      kicker: 'Checkpoint 04 · Accountability',
      title: 'Who owns the result when the workflow finishes?',
      copy: 'A private AI coworker still needs a human manager who owns the metric, reviews exceptions, and decides when the process must stop.',
      options: [
        { label: 'Nobody clearly owns it', detail: 'Automation would hide an accountability problem rather than solve it.', points: 0, flag: 'There is no named human owner for the result.' },
        { label: 'Several people share it informally', detail: 'Name one accountable owner before a pilot starts.', points: 1 },
        { label: 'A team or role owns it', detail: 'Viable if one person can make pilot decisions.', points: 3 },
        { label: 'One named person owns the outcome and exceptions', detail: 'Strong governance signal.', points: 4 },
      ],
    },
    {
      id: 'inputs',
      dimension: 'data',
      kicker: 'Checkpoint 05 · Source material',
      title: 'Where does the workflow get its information?',
      copy: 'Approved, accessible inputs matter more than the number of AI features. Start with the smallest useful data boundary.',
      options: [
        { label: 'Mostly memory, calls, and unrecorded conversations', detail: 'The inputs need to become observable before they can be automated reliably.', points: 0, flag: 'Important inputs are not recorded in usable sources.' },
        { label: 'Emails, documents, or shared folders', detail: 'Potentially usable after access and data-quality review.', points: 2 },
        { label: 'Spreadsheets, exports, or one structured system', detail: 'A practical starting point for a controlled pilot.', points: 3 },
        { label: 'Two or more systems with consistent usable data', detail: 'Strong data signal, subject to permission and quality checks.', points: 4 },
      ],
    },
    {
      id: 'measurement',
      dimension: 'data',
      kicker: 'Checkpoint 06 · Proof',
      title: 'How would you know the workflow improved?',
      copy: 'Choose a metric that exists before the pilot: time, review effort, cycle time, missed exceptions, accuracy, or throughput.',
      options: [
        { label: 'We would know it when we see it', detail: 'A baseline and success measure must be defined first.', points: 0, flag: 'There is no agreed way to measure a better result.' },
        { label: 'People agree it is frustrating or slow', detail: 'Useful discovery evidence, but not yet a pilot metric.', points: 2 },
        { label: 'We can estimate time, errors, or delays today', detail: 'Enough to build a baseline during discovery.', points: 3 },
        { label: 'We already track a relevant metric', detail: 'Strong evidence-readiness signal.', points: 4 },
      ],
    },
    {
      id: 'teamSize',
      dimension: 'control',
      kicker: 'Checkpoint 07 · Operating environment',
      title: 'How large is the team affected by this workflow?',
      copy: 'The initial offer is designed around small-business operations, especially where the owner or operations lead is close to the work.',
      options: [
        { label: 'One to four people', detail: 'Possible, but the workflow needs a clear cost or risk to justify custom work.', points: 2 },
        { label: 'Five to nine people', detail: 'A viable small-team fit when the workflow is operationally important.', points: 3 },
        { label: 'Ten to fifty people', detail: 'The primary fit for the current private AI coworker offer.', points: 4 },
        { label: 'More than fifty people', detail: 'Potentially viable, with additional governance and stakeholder work.', points: 3 },
      ],
    },
    {
      id: 'authority',
      dimension: 'control',
      kicker: 'Checkpoint 08 · Authority boundary',
      title: 'What should the AI be allowed to do first?',
      copy: 'The safest first release reads, prepares, flags, and recommends. Consequential actions remain visible and approval-gated.',
      options: [
        { label: 'Make high-impact decisions and act without review', detail: 'This is not eligible as a first bounded pilot.', points: 0, flag: 'The desired first release requires unsupervised high-impact actions.' },
        { label: 'Prepare recommendations for a person to approve', detail: 'A strong human-in-the-loop boundary.', points: 4 },
        { label: 'Read data, produce a report, and flag exceptions', detail: 'The strongest low-risk starting boundary.', points: 4 },
        { label: 'Complete low-risk steps, pausing at approval gates', detail: 'Viable when permissions, logs, and recovery are explicit.', points: 3 },
      ],
    },
  ];

  const state = {
    phase: 'intro',
    index: 0,
    answers: {},
    contact: {
      businessName: '',
      industry: '',
      email: '',
      consent: false,
    },
    submitError: '',
    assessmentId: createAssessmentId(),
    result: null,
  };

  const app = document.getElementById('assessment-app');
  const progressLabel = document.getElementById('progress-label');
  const progressPercent = document.getElementById('progress-percent');
  const progressBar = document.getElementById('progress-bar');

  function createAssessmentId() {
    const bytes = new Uint8Array(6);
    if (window.crypto?.getRandomValues) {
      window.crypto.getRandomValues(bytes);
      return `atlas-${Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('')}`;
    }
    return `atlas-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function getAnsweredCount() {
    return questions.filter((question) => state.answers[question.id]).length;
  }

  function updateChrome() {
    let percent = 0;
    let label = 'Mission briefing';

    if (state.phase === 'question') {
      percent = Math.round((getAnsweredCount() / questions.length) * 82);
      label = `Checkpoint ${String(state.index + 1).padStart(2, '0')} of ${questions.length}`;
    } else if (state.phase === 'capture' || state.phase === 'submitting') {
      percent = 92;
      label = 'Secure your result';
    } else if (state.phase === 'result') {
      percent = 100;
      label = 'Assessment complete';
    }

    progressLabel.textContent = label;
    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;

    const currentDimension =
      state.phase === 'question' ? questions[state.index].dimension : state.phase === 'intro' ? null : 'complete';

    document.querySelectorAll('[data-signal]').forEach((item) => {
      const signal = item.dataset.signal;
      const signalQuestions = questions.filter((question) => question.dimension === signal);
      const isComplete = signalQuestions.every((question) => state.answers[question.id]);
      item.classList.toggle('is-complete', isComplete || currentDimension === 'complete');
      item.classList.toggle('is-active', signal === currentDimension);
    });
  }

  function render() {
    updateChrome();

    if (state.phase === 'intro') renderIntro();
    if (state.phase === 'question') renderQuestion();
    if (state.phase === 'capture' || state.phase === 'submitting') renderCapture();
    if (state.phase === 'result') renderResult();
  }

  function renderIntro() {
    app.innerHTML = `
      <div class="screen screen--intro">
        <div class="intro-orbit" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M4 18.5 8.5 14l3 3L20 8.5"/><path d="M15 8.5h5v5"/><circle cx="7" cy="7" r="3"/></svg>
        </div>
        <p class="step-kicker">Private AI coworker readiness</p>
        <h2 class="intro-title" id="stage-title">Is one of your workflows ready for AI?</h2>
        <p class="intro-copy">
          Choose one recurring process. In about three minutes, you will get a readiness score,
          the gaps that could make a pilot fail, and the smallest sensible next step.
        </p>
        <ul class="intro-facts" aria-label="Assessment facts">
          <li><strong>8</strong><span>checkpoints</span></li>
          <li><strong>3 min</strong><span>typical time</span></li>
          <li><strong>1</strong><span>workflow only</span></li>
        </ul>
        <div class="button-row">
          <button class="primary-button" type="button" id="start-assessment">
            Start the mission <span class="button-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('start-assessment').addEventListener('click', () => {
      state.phase = 'question';
      state.index = 0;
      render();
    });
  }

  function renderQuestion() {
    const question = questions[state.index];
    const selected = state.answers[question.id];

    app.innerHTML = `
      <div class="screen screen--question">
        <div class="question-meta">
          <span>${escapeHtml(dimensions[question.dimension].label)}</span>
          <strong>${String(state.index + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}</strong>
        </div>
        <p class="step-kicker">${escapeHtml(question.kicker)}</p>
        <h2 class="question-title" id="stage-title">${escapeHtml(question.title)}</h2>
        <p class="question-copy">${escapeHtml(question.copy)}</p>
        <div class="option-grid" role="radiogroup" aria-label="${escapeHtml(question.title)}">
          ${question.options
            .map(
              (option, index) => `
                <button
                  class="option-card${selected?.optionIndex === index ? ' is-selected' : ''}"
                  type="button"
                  role="radio"
                  aria-checked="${selected?.optionIndex === index ? 'true' : 'false'}"
                  data-option-index="${index}"
                >
                  <span class="option-card__key">${String.fromCharCode(65 + index)}</span>
                  <span>
                    <strong>${escapeHtml(option.label)}</strong>
                    <small>${escapeHtml(option.detail)}</small>
                  </span>
                </button>
              `,
            )
            .join('')}
        </div>
        <div class="button-row">
          <button class="text-button" type="button" id="go-back">← Back</button>
          <button class="primary-button" type="button" id="continue" ${selected ? '' : 'disabled'}>
            ${state.index === questions.length - 1 ? 'Finish checkpoints' : 'Continue'}
            <span class="button-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('[data-option-index]').forEach((button) => {
      button.addEventListener('click', () => {
        const optionIndex = Number(button.dataset.optionIndex);
        const option = question.options[optionIndex];
        state.answers[question.id] = {
          questionId: question.id,
          dimension: question.dimension,
          question: question.title,
          optionIndex,
          label: option.label,
          points: option.points,
          flag: option.flag || '',
        };

        app.querySelectorAll('[data-option-index]').forEach((optionButton) => {
          const isSelected = Number(optionButton.dataset.optionIndex) === optionIndex;
          optionButton.classList.toggle('is-selected', isSelected);
          optionButton.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        });
        document.getElementById('continue').disabled = false;
        updateChrome();
      });
    });

    document.getElementById('go-back').addEventListener('click', () => {
      if (state.index === 0) {
        state.phase = 'intro';
      } else {
        state.index -= 1;
      }
      render();
    });

    document.getElementById('continue').addEventListener('click', () => {
      if (!state.answers[question.id]) return;
      if (state.index === questions.length - 1) {
        state.phase = 'capture';
      } else {
        state.index += 1;
      }
      render();
    });
  }

  function renderCapture() {
    const isSubmitting = state.phase === 'submitting';
    app.innerHTML = `
      <div class="screen screen--capture">
        <p class="step-kicker">Checkpoints complete · Result locked</p>
        <h2 class="capture-title" id="stage-title">Where should we send the signal?</h2>
        <p class="capture-copy">
          Add your business details to reveal the score. Your answers will be saved as one private
          assessment response so the workflow can be reviewed if you want to discuss a pilot.
        </p>
        <form id="result-form" novalidate>
          <div class="field-grid">
            <div class="field">
              <label for="business-name">Business name</label>
              <input id="business-name" name="businessName" autocomplete="organization" placeholder="Company or team" value="${escapeHtml(state.contact.businessName)}" ${isSubmitting ? 'disabled' : ''} />
              <p class="field-error" id="business-name-error"></p>
            </div>
            <div class="field">
              <label for="industry">Industry</label>
              <select id="industry" name="industry" ${isSubmitting ? 'disabled' : ''}>
                <option value="">Select one</option>
                ${['Professional services', 'Agency or consultancy', 'Engineering or manufacturing', 'Wholesale or retail', 'Property or hospitality', 'Technology', 'Healthcare or regulated services', 'Other']
                  .map((industry) => `<option value="${escapeHtml(industry)}" ${state.contact.industry === industry ? 'selected' : ''}>${escapeHtml(industry)}</option>`)
                  .join('')}
              </select>
              <p class="field-error" id="industry-error"></p>
            </div>
            <div class="field field--full">
              <label for="work-email">Work email</label>
              <input id="work-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="you@company.com" value="${escapeHtml(state.contact.email)}" ${isSubmitting ? 'disabled' : ''} />
              <p class="field-error" id="work-email-error"></p>
            </div>
          </div>
          <label class="consent" for="consent">
            <input id="consent" name="consent" type="checkbox" ${state.contact.consent ? 'checked' : ''} ${isSubmitting ? 'disabled' : ''} />
            <span>I agree that VanDer Engineering may use these answers to evaluate this workflow and contact me about a possible diagnostic or pilot.</span>
          </label>
          <p class="consent-error" id="consent-error"></p>
          <div class="privacy-copy">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="1"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
            <span>Your response is submitted to the same private Google Form pipeline used by the website. It is not posted publicly. Do not include passwords, credentials, or confidential customer records.</span>
          </div>
          ${state.submitError ? `<div class="submit-error" role="alert">${escapeHtml(state.submitError)}</div>` : ''}
          <div class="button-row">
            <button class="text-button" type="button" id="capture-back" ${isSubmitting ? 'disabled' : ''}>← Review answers</button>
            <button class="primary-button" type="submit" ${isSubmitting ? 'disabled' : ''}>
              ${isSubmitting ? '<span class="spinner" aria-hidden="true"></span> Saving assessment…' : 'Reveal my readiness score <span class="button-arrow" aria-hidden="true">→</span>'}
            </button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('capture-back').addEventListener('click', () => {
      state.phase = 'question';
      state.index = questions.length - 1;
      render();
    });

    document.getElementById('result-form').addEventListener('submit', handleResultSubmit);
  }

  async function handleResultSubmit(event) {
    event.preventDefault();
    if (state.phase === 'submitting') return;

    const formData = new FormData(event.currentTarget);
    state.contact = {
      businessName: String(formData.get('businessName') || '').trim(),
      industry: String(formData.get('industry') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      consent: formData.get('consent') === 'on',
    };

    const errors = validateContact(state.contact);
    if (Object.keys(errors).length > 0) {
      setCaptureErrors(errors);
      return;
    }

    state.submitError = '';
    state.phase = 'submitting';
    render();

    const result = calculateResult();
    const submittedAt = new Date().toISOString();
    const report = buildSubmissionReport(result, submittedAt);
    const formBody = new URLSearchParams({
      [FORM_ENTRIES.businessName]: `[Automation assessment] ${state.contact.businessName}`,
      [FORM_ENTRIES.email]: state.contact.email,
      [FORM_ENTRIES.report]: report,
    });

    try {
      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: formBody.toString(),
      });

      state.result = { ...result, submittedAt };
      state.phase = 'result';
      render();
    } catch (error) {
      state.phase = 'capture';
      state.submitError = 'The assessment could not be saved. Check your connection and try again; your answers are still here.';
      render();
    }
  }

  function validateContact(contact) {
    const errors = {};
    if (!contact.businessName) errors.businessName = 'Enter the business or team name.';
    if (!contact.industry) errors.industry = 'Select the closest industry.';
    if (!contact.email) {
      errors.email = 'Enter a work email.';
    } else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!contact.consent) errors.consent = 'Consent is required to save and review this assessment.';
    return errors;
  }

  function setCaptureErrors(errors) {
    const mapping = {
      businessName: ['business-name', 'business-name-error'],
      industry: ['industry', 'industry-error'],
      email: ['work-email', 'work-email-error'],
      consent: ['consent', 'consent-error'],
    };

    Object.entries(mapping).forEach(([key, [fieldId, errorId]]) => {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      const message = errors[key] || '';
      field?.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (error) error.textContent = message;
    });

    const firstError = Object.keys(errors)[0];
    document.getElementById(mapping[firstError][0])?.focus();
  }

  function calculateResult() {
    const raw = { workflow: 0, process: 0, data: 0, control: 0 };
    const flags = [];

    questions.forEach((question) => {
      const answer = state.answers[question.id];
      if (!answer) return;
      raw[question.dimension] += answer.points;
      if (answer.flag) flags.push(answer.flag);
    });

    const breakdown = Object.fromEntries(
      Object.entries(raw).map(([dimension, points]) => [dimension, Math.round((points / 8) * 100)]),
    );
    const score = Math.round((Object.values(raw).reduce((sum, value) => sum + value, 0) / 32) * 100);

    let level = 'Discovery-first workflow';
    let summary =
      'The workflow needs a clearer owner, process, data boundary, or success measure before custom AI implementation is likely to produce useful evidence.';

    if (score >= 75 && flags.length === 0) {
      level = 'Pilot-ready signal';
      summary =
        'This workflow shows the core ingredients for a bounded pilot: repetition, accountable ownership, usable inputs, a measurable result, and a safe first authority boundary.';
    } else if (score >= 50 && flags.length <= 2) {
      level = 'Promising—close the gaps first';
      summary =
        'There is a credible automation opportunity here, but one or two readiness gaps should be resolved before implementation so the pilot can produce trustworthy evidence.';
    }

    return {
      score,
      breakdown,
      flags,
      level,
      summary,
      recommendations: buildRecommendations(),
    };
  }

  function buildRecommendations() {
    const recommendations = [];
    const points = (id) => state.answers[id]?.points ?? 0;

    if (points('ownership') < 3) recommendations.push('Name one person who owns the outcome, approves exceptions, and can stop the pilot.');
    if (points('stability') < 3) recommendations.push('Map the happy path plus the three most common exceptions before connecting any system.');
    if (points('inputs') < 3) recommendations.push('Inventory the smallest approved set of files or systems needed to produce one useful output.');
    if (points('measurement') < 3) recommendations.push('Capture a baseline for time, review effort, cycle time, misses, or accuracy before building.');
    if (points('authority') < 3) recommendations.push('Redesign the first release as read-only or recommendation-first, with explicit human approval gates.');
    if (points('frequency') < 3 || points('effort') < 2) recommendations.push('Compare this candidate with a more frequent or costly recurring workflow before investing.');

    const defaults = [
      'Collect three recent real examples, including one normal case and two exceptions.',
      'Define one output, one success metric, and one explicit list of actions the AI may not take.',
      'Run the candidate process beside the current method before replacing any operational step.',
    ];

    defaults.forEach((item) => {
      if (recommendations.length < 3) recommendations.push(item);
    });

    return recommendations.slice(0, 3);
  }

  function buildSubmissionReport(result, submittedAt) {
    const answerLines = questions.flatMap((question, index) => {
      const answer = state.answers[question.id];
      return [`Q${index + 1}: ${question.title}`, `A${index + 1}: ${answer?.label || 'No answer'}`];
    });

    return [
      'PRIVATE AI WORKFLOW READINESS ASSESSMENT',
      `Assessment ID: ${state.assessmentId}`,
      `Submitted at: ${submittedAt}`,
      `Business: ${state.contact.businessName}`,
      `Industry: ${state.contact.industry}`,
      `Result: ${result.level}`,
      `Overall score: ${result.score}/100`,
      `Workflow signal: ${result.breakdown.workflow}/100`,
      `Process readiness: ${result.breakdown.process}/100`,
      `Data & measurement: ${result.breakdown.data}/100`,
      `Operating fit: ${result.breakdown.control}/100`,
      `Flagged gaps: ${result.flags.length ? result.flags.join(' | ') : 'None'}`,
      '',
      'ANSWERS',
      ...answerLines,
      '',
      'RECOMMENDED NEXT MOVES',
      ...result.recommendations.map((item, index) => `${index + 1}. ${item}`),
      '',
      'Consent: The respondent agreed that VanDer Engineering may use these answers to evaluate the workflow and contact them about a possible diagnostic or pilot.',
    ].join('\n');
  }

  function renderResult() {
    const result = state.result;
    const orderedBreakdown = Object.entries(result.breakdown).sort(
      ([first], [second]) => dimensions[first].order - dimensions[second].order,
    );

    app.innerHTML = `
      <div class="screen screen--result">
        <p class="result-kicker">Assessment complete · ${escapeHtml(state.assessmentId)}</p>
        <h2 class="result-title" id="stage-title">${escapeHtml(state.contact.businessName)} has a ${escapeHtml(result.level.toLowerCase())}.</h2>
        <div class="result-topline">
          <div class="score-ring" style="--score: ${result.score}" data-testid="readiness-score">
            <div class="score-ring__value"><strong>${result.score}</strong><span>out of 100</span></div>
          </div>
          <div>
            <span class="result-status">${escapeHtml(result.level)}</span>
            <p class="result-copy">${escapeHtml(result.summary)}</p>
          </div>
        </div>
        <div class="breakdown-grid" aria-label="Readiness score breakdown">
          ${orderedBreakdown
            .map(
              ([key, value]) => `
                <article class="breakdown-card">
                  <div class="breakdown-card__top"><strong>${escapeHtml(dimensions[key].label)}</strong><span>${value}</span></div>
                  <div class="breakdown-card__bar" aria-hidden="true"><span style="width: ${value}%"></span></div>
                </article>
              `,
            )
            .join('')}
        </div>
        <section class="next-moves">
          <h3>Your three smallest sensible next moves</h3>
          <ol>${result.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
        </section>
        <p class="saved-note"><span aria-hidden="true">✓</span> Your answers and score were submitted to the private assessment response sheet.</p>
        <div class="button-row">
          <button class="primary-button" type="button" id="print-result">Print or save result</button>
          <button class="secondary-button" type="button" id="restart-assessment">Assess another workflow</button>
        </div>
      </div>
    `;

    document.getElementById('print-result').addEventListener('click', () => window.print());
    document.getElementById('restart-assessment').addEventListener('click', resetAssessment);
  }

  function resetAssessment() {
    state.phase = 'intro';
    state.index = 0;
    state.answers = {};
    state.contact = { businessName: '', industry: '', email: '', consent: false };
    state.submitError = '';
    state.result = null;
    state.assessmentId = createAssessmentId();
    render();
  }

  render();
})();
