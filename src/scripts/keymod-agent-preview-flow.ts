import {
  AGENT_DEMO_DEFAULT_SCRIPT_ID,
  AGENT_DEMO_SCRIPT_BY_ID,
  AGENT_DEMO_TIMING,
  type AgentDemoScript,
  type AgentPlanStepKind,
} from '../data/keymodAgentDemo';

type FlowState = 'overlay' | 'playing' | 'act' | 'executing' | 'complete';

let rootEl: HTMLElement | null = null;
let state: FlowState = 'overlay';
let inView = false;
let reducedMotion = false;
let observer: IntersectionObserver | null = null;
let clickAbort: AbortController | null = null;
let autoTimer: number | null = null;
let beatTimer: number | null = null;
let lineTimer: number | null = null;
let completeTimer: number | null = null;
let userPickedScript = false;
let activeScript: AgentDemoScript | null = null;
let terminalLineIndex = 0;
let macroStepIndex = 0;
let executionPhase: 'terminal' | 'macro' | 'done' = 'done';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function q<T extends Element>(sel: string): T | null {
  return rootEl?.querySelector<T>(sel) ?? null;
}

function clearTimers(): void {
  for (const t of [autoTimer, beatTimer, lineTimer, completeTimer]) {
    if (t !== null) window.clearTimeout(t);
  }
  autoTimer = beatTimer = lineTimer = completeTimer = null;
}

function label(key: 'plan' | 'actPrompt' | 'approve' | 'editPlan' | 'cancel' | 'terminal' | 'macro'): string {
  if (!rootEl) return '';
  const map: Record<typeof key, string | undefined> = {
    plan: rootEl.dataset.planLabel,
    actPrompt: rootEl.dataset.actPrompt,
    approve: rootEl.dataset.approveLabel,
    editPlan: rootEl.dataset.editPlanLabel,
    cancel: rootEl.dataset.cancelLabel,
    terminal: rootEl.dataset.terminalLabel,
    macro: rootEl.dataset.macroLabel,
  };
  return map[key] ?? '';
}

function setState(next: FlowState): void {
  state = next;
  if (!rootEl) return;

  rootEl.dataset.flowState = next;
  rootEl.classList.toggle('km-agent-flow--overlay', next === 'overlay');
  rootEl.classList.toggle('km-agent-flow--playing', next === 'playing' || next === 'act' || next === 'executing');
  rootEl.classList.toggle('km-agent-flow--complete', next === 'complete');
  rootEl.classList.toggle('km-agent-flow--planning', next === 'playing' || next === 'act');

  const overlay = q<HTMLElement>('[data-km-agent-overlay]');
  const transcript = q<HTMLElement>('[data-km-agent-transcript]');
  if (overlay) overlay.hidden = next !== 'overlay';
  if (transcript) transcript.hidden = next === 'overlay';

  updatePickerPulse();
}

function transcriptEl(): HTMLElement | null {
  return q<HTMLElement>('[data-km-agent-transcript]');
}

function scrollTranscript(): void {
  const el = transcriptEl();
  if (el) el.scrollTop = el.scrollHeight;
}

function clearTranscript(): void {
  const el = transcriptEl();
  if (el) el.innerHTML = '';
}

function stepIcon(kind: AgentPlanStepKind): string {
  if (kind === 'terminal') return '⌘';
  if (kind === 'macro') return '☰';
  return '⌨';
}

function appendMessage(node: HTMLElement): void {
  const el = transcriptEl();
  if (!el) return;
  el.appendChild(node);
  scrollTranscript();
}

function createUserBubble(text: string): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'km-agent-flow__msg km-agent-flow__msg--user';
  wrap.innerHTML = `<p class="km-agent-flow__bubble km-agent-flow__bubble--user">${escapeHtml(text)}</p>`;
  return wrap;
}

function createAssistantBubble(text: string): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'km-agent-flow__msg km-agent-flow__msg--assistant';
  wrap.innerHTML = `
    <img class="km-agent-flow__avatar" src="/keymod/rebirth/mascot/gibby-ai-chat.webp" alt="" width="28" height="28" />
    <p class="km-agent-flow__bubble km-agent-flow__bubble--assistant">${escapeHtml(text)}</p>`;
  return wrap;
}

function createPlanCard(script: AgentDemoScript): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'km-agent-flow__msg km-agent-flow__msg--plan';
  const steps = script.planSteps
    .map(
      (step) => `
      <li class="km-agent-flow__plan-step">
        <span class="km-agent-flow__plan-badge">${step.index}</span>
        <span class="km-agent-flow__plan-icon" aria-hidden="true">${stepIcon(step.kind)}</span>
        <span class="km-agent-flow__plan-text">
          <span class="km-agent-flow__plan-title">${escapeHtml(step.title)}</span>
          <span class="km-agent-flow__plan-sub">${escapeHtml(step.subtitle)}</span>
        </span>
      </li>`,
    )
    .join('');
  wrap.innerHTML = `
    <div class="km-agent-flow__plan-card">
      <p class="km-agent-flow__plan-label">${escapeHtml(label('plan'))}</p>
      <ol class="km-agent-flow__plan-steps">${steps}</ol>
    </div>`;
  return wrap;
}

function createActBar(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'km-agent-flow__msg km-agent-flow__msg--act';
  wrap.dataset.kmAgentActBar = '';
  wrap.innerHTML = `
    <p class="km-agent-flow__act-prompt">${escapeHtml(label('actPrompt'))}</p>
    <button type="button" class="km-agent-flow__act-approve" data-km-agent-approve>${escapeHtml(label('approve'))}</button>
    <div class="km-agent-flow__act-secondary">
      <button type="button" class="km-agent-flow__act-text" data-km-agent-edit disabled>${escapeHtml(label('editPlan'))}</button>
      <button type="button" class="km-agent-flow__act-text" data-km-agent-cancel>${escapeHtml(label('cancel'))}</button>
    </div>`;
  return wrap;
}

function createTerminalCard(lines: string[]): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'km-agent-flow__msg km-agent-flow__msg--terminal';
  wrap.dataset.kmAgentTerminal = '';
  const body = lines.map((line) => `<div class="km-agent-flow__terminal-line">${escapeHtml(line)}</div>`).join('');
  wrap.innerHTML = `
    <div class="km-agent-flow__exec-card km-agent-flow__exec-card--terminal">
      <p class="km-agent-flow__exec-label">${escapeHtml(label('terminal'))}</p>
      <div class="km-agent-flow__terminal-body" data-km-agent-terminal-body>${body}</div>
    </div>`;
  return wrap;
}

function createMacroCard(script: AgentDemoScript): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'km-agent-flow__msg km-agent-flow__msg--macro';
  wrap.dataset.kmAgentMacro = '';
  const steps = script.macroChecklist
    .map(
      (step, i) =>
        `<li class="km-agent-flow__macro-step" data-km-agent-macro-step="${i}"><span class="km-agent-flow__macro-check" aria-hidden="true"></span>${escapeHtml(step)}</li>`,
    )
    .join('');
  wrap.innerHTML = `
    <div class="km-agent-flow__exec-card km-agent-flow__exec-card--macro">
      <p class="km-agent-flow__exec-label">${escapeHtml(label('macro'))}</p>
      <div class="km-agent-flow__macro-bar"><div class="km-agent-flow__macro-bar-fill" data-km-agent-macro-fill style="width:0%"></div></div>
      <p class="km-agent-flow__macro-chip" data-km-agent-macro-chip></p>
      <ul class="km-agent-flow__macro-steps">${steps}</ul>
    </div>`;
  return wrap;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updatePickerPulse(): void {
  if (!rootEl) return;
  const show = state === 'overlay' && inView && !userPickedScript && !reducedMotion;
  rootEl.classList.toggle('km-agent-flow--picker-pulse', show);
}

function highlightPicker(scriptId: string | null): void {
  rootEl?.querySelectorAll<HTMLElement>('[data-km-agent-script]').forEach((btn) => {
    btn.classList.toggle('km-agent-flow__picker-card--selected', btn.dataset.kmAgentScript === scriptId);
  });
}

function resetToOverlay(): void {
  clearTimers();
  activeScript = null;
  terminalLineIndex = 0;
  macroStepIndex = 0;
  executionPhase = 'done';
  clearTranscript();
  highlightPicker(null);
  setState('overlay');
  const live = q<HTMLElement>('[data-km-agent-live]');
  if (live) live.textContent = '';
}

function scheduleAutoStart(): void {
  if (!inView || reducedMotion || userPickedScript || state !== 'overlay') return;
  clearTimers();
  updatePickerPulse();
  autoTimer = window.setTimeout(() => {
    autoTimer = null;
    if (state === 'overlay' && inView && !userPickedScript) {
      startScript(AGENT_DEMO_DEFAULT_SCRIPT_ID, true);
    }
  }, AGENT_DEMO_TIMING.autoStartDelayMs);
}

function showActBar(): void {
  if (!activeScript) return;
  appendMessage(createActBar());
  setState('act');
  const live = q<HTMLElement>('[data-km-agent-live]');
  if (live) live.textContent = 'Review the plan before approving';

  beatTimer = window.setTimeout(() => {
    beatTimer = null;
    if (state === 'act') approveAndRun();
  }, AGENT_DEMO_TIMING.beatDelayMs);
}

function runIntroSequence(): void {
  if (!activeScript) return;
  setState('playing');
  highlightPicker(activeScript.id);

  appendMessage(createUserBubble(activeScript.userPrompt));

  beatTimer = window.setTimeout(() => {
    beatTimer = null;
    if (!activeScript || state !== 'playing') return;
    appendMessage(createAssistantBubble(activeScript.assistantIntro));

    beatTimer = window.setTimeout(() => {
      beatTimer = null;
      if (!activeScript || state !== 'playing') return;
      appendMessage(createPlanCard(activeScript));
      showActBar();
    }, AGENT_DEMO_TIMING.beatDelayMs);
  }, AGENT_DEMO_TIMING.beatDelayMs);
}

function removeActBar(): void {
  q<HTMLElement>('[data-km-agent-act-bar]')?.remove();
}

function approveAndRun(): void {
  if (!activeScript || state !== 'act') return;
  clearTimers();
  removeActBar();
  setState('executing');
  executionPhase = activeScript.hasCliExecution ? 'terminal' : activeScript.hasMacroExecution ? 'macro' : 'done';
  runExecutionPhase();
}

function runExecutionPhase(): void {
  if (!activeScript) return;

  if (executionPhase === 'terminal' && activeScript.hasCliExecution) {
    const card = createTerminalCard([]);
    appendMessage(card);
    terminalLineIndex = 0;
    revealTerminalLine(card);
    return;
  }

  if (executionPhase === 'macro' && activeScript.hasMacroExecution) {
    const card = createMacroCard(activeScript);
    appendMessage(card);
    macroStepIndex = 0;
    revealMacroStep(card);
    return;
  }

  finishExecution();
}

function revealTerminalLine(card: HTMLElement): void {
  if (!activeScript || state !== 'executing') return;
  const body = card.querySelector<HTMLElement>('[data-km-agent-terminal-body]');
  if (!body) return;

  if (terminalLineIndex >= activeScript.terminalOutputLines.length) {
    if (activeScript.hasMacroExecution) {
      executionPhase = 'macro';
      runExecutionPhase();
    } else {
      finishExecution();
    }
    return;
  }

  const line = document.createElement('div');
  line.className = 'km-agent-flow__terminal-line';
  line.textContent = activeScript.terminalOutputLines[terminalLineIndex];
  body.appendChild(line);
  terminalLineIndex += 1;
  scrollTranscript();

  lineTimer = window.setTimeout(() => revealTerminalLine(card), AGENT_DEMO_TIMING.terminalLineDelayMs);
}

function revealMacroStep(card: HTMLElement): void {
  if (!activeScript || state !== 'executing') return;

  const steps = card.querySelectorAll<HTMLElement>('[data-km-agent-macro-step]');
  const fill = card.querySelector<HTMLElement>('[data-km-agent-macro-fill]');
  const chip = card.querySelector<HTMLElement>('[data-km-agent-macro-chip]');
  const total = activeScript.macroChecklist.length;

  if (macroStepIndex >= total) {
    finishExecution();
    return;
  }

  const stepEl = steps[macroStepIndex];
  stepEl?.classList.add('km-agent-flow__macro-step--done');
  if (fill && total > 0) {
    fill.style.width = `${((macroStepIndex + 1) / total) * 100}%`;
  }
  if (chip && activeScript.macroStatusChips[macroStepIndex]) {
    chip.textContent = activeScript.macroStatusChips[macroStepIndex];
  }
  macroStepIndex += 1;
  scrollTranscript();

  lineTimer = window.setTimeout(() => revealMacroStep(card), AGENT_DEMO_TIMING.macroStepDelayMs);
}

function finishExecution(): void {
  if (!activeScript) return;
  appendMessage(createAssistantBubble(activeScript.summaryMessage));
  setState('complete');
  const live = q<HTMLElement>('[data-km-agent-live]');
  if (live) live.textContent = 'Agent preview complete';

  completeTimer = window.setTimeout(() => {
    completeTimer = null;
    userPickedScript = false;
    resetToOverlay();
    if (inView) scheduleAutoStart();
  }, AGENT_DEMO_TIMING.completeHoldMs);
}

function startScript(scriptId: string, auto = false): void {
  if (reducedMotion || !rootEl) return;
  const script = AGENT_DEMO_SCRIPT_BY_ID[scriptId];
  if (!script) return;

  if (!auto) userPickedScript = true;
  clearTimers();
  clearTranscript();
  activeScript = script;

  const live = q<HTMLElement>('[data-km-agent-live]');
  if (live) live.textContent = `Starting Agent demo: ${script.pickerTitle}`;

  runIntroSequence();
}

function showStaticComplete(): void {
  const script = AGENT_DEMO_SCRIPT_BY_ID[AGENT_DEMO_DEFAULT_SCRIPT_ID];
  if (!script || !rootEl) return;

  activeScript = script;
  clearTranscript();
  highlightPicker(script.id);

  appendMessage(createUserBubble(script.userPrompt));
  appendMessage(createAssistantBubble(script.assistantIntro));
  appendMessage(createPlanCard(script));
  if (script.hasCliExecution) {
    appendMessage(createTerminalCard(script.terminalOutputLines));
  }
  if (script.hasMacroExecution) {
    const macro = createMacroCard(script);
    macro.querySelectorAll('[data-km-agent-macro-step]').forEach((el) => {
      el.classList.add('km-agent-flow__macro-step--done');
    });
    const fill = macro.querySelector<HTMLElement>('[data-km-agent-macro-fill]');
    if (fill) fill.style.width = '100%';
    const chip = macro.querySelector<HTMLElement>('[data-km-agent-macro-chip]');
    if (chip && script.macroStatusChips.length > 0) {
      chip.textContent = script.macroStatusChips[script.macroStatusChips.length - 1];
    }
    appendMessage(macro);
  }
  appendMessage(createAssistantBubble(script.summaryMessage));

  const overlay = q<HTMLElement>('[data-km-agent-overlay]');
  if (overlay) overlay.hidden = true;
  const transcript = q<HTMLElement>('[data-km-agent-transcript]');
  if (transcript) transcript.hidden = false;
  setState('complete');
}

function onRootClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target || !rootEl || reducedMotion) return;

  const scriptBtn = target.closest<HTMLElement>('[data-km-agent-script]');
  if (scriptBtn?.dataset.kmAgentScript) {
    startScript(scriptBtn.dataset.kmAgentScript);
    return;
  }

  if (target.closest('[data-km-agent-approve]')) {
    approveAndRun();
    return;
  }

  if (target.closest('[data-km-agent-cancel]')) {
    userPickedScript = false;
    resetToOverlay();
    scheduleAutoStart();
  }
}

function bindRoot(root: HTMLElement): void {
  if (rootEl === root) return;
  unbindRoot();

  rootEl = root;
  reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    root.classList.add('km-agent-flow--reduced-motion');
    showStaticComplete();
    return;
  }

  clickAbort = new AbortController();
  root.addEventListener('click', onRootClick, { signal: clickAbort.signal });

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      inView = Boolean(entry?.isIntersecting);
      if (inView) {
        if (state === 'overlay') scheduleAutoStart();
      } else {
        userPickedScript = false;
        resetToOverlay();
      }
      updatePickerPulse();
    },
    { threshold: AGENT_DEMO_TIMING.intersectionThreshold },
  );
  observer.observe(root);

  resetToOverlay();
}

function unbindRoot(): void {
  clearTimers();
  observer?.disconnect();
  observer = null;
  clickAbort?.abort();
  clickAbort = null;
  rootEl = null;
  state = 'overlay';
  inView = false;
  userPickedScript = false;
  activeScript = null;
}

export function initKeymodAgentPreviewFlow(): void {
  const root = document.querySelector<HTMLElement>('[data-km-agent-flow]');
  if (!root) {
    unbindRoot();
    return;
  }
  bindRoot(root);
}

function boot(): void {
  initKeymodAgentPreviewFlow();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodAgentPreviewFlow);
