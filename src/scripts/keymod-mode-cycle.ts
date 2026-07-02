export const KEYMOD_MODE_CYCLE_MS = 3400;
export const KEYMOD_CYCLE_RESUME_MS = 10_000;
/** POV In action — longer idle after a tab click before autoplay resumes. */
export const KEYMOD_POV_USER_RESUME_MS = 30_000;

export type ModeCycleController = {
  start: () => void;
  stop: () => void;
  pauseForUser: () => void;
  destroy: () => void;
  isPausedForUser: () => boolean;
  userResumeMs: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createModeCycle(options: {
  onAdvance: () => void;
  isEnabled?: () => boolean;
  userResumeMs?: number;
}): ModeCycleController {
  const userResumeMs = options.userResumeMs ?? KEYMOD_CYCLE_RESUME_MS;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let resumeId: ReturnType<typeof setTimeout> | null = null;

  const clearResume = (): void => {
    if (resumeId !== null) {
      clearTimeout(resumeId);
      resumeId = null;
    }
  };

  const stop = (): void => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const start = (): void => {
    if (prefersReducedMotion()) return;
    if (options.isEnabled && !options.isEnabled()) return;
    if (intervalId !== null) return;
    clearResume();
    intervalId = setInterval(options.onAdvance, KEYMOD_MODE_CYCLE_MS);
  };

  const pauseForUser = (): void => {
    stop();
    clearResume();
    resumeId = setTimeout(() => {
      resumeId = null;
      start();
    }, userResumeMs);
  };

  const destroy = (): void => {
    stop();
    clearResume();
  };

  return {
    start,
    stop,
    pauseForUser,
    destroy,
    isPausedForUser: () => resumeId !== null,
    userResumeMs,
  };
}
