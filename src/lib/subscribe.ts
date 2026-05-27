export type SubscribePayload = {
  email: string;
  name?: string;
};

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'network' | 'failed' };

export async function submitSubscribe(
  endpoint: string,
  payload: SubscribePayload,
): Promise<SubscribeResult> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: payload.email.trim(),
        name: payload.name?.trim() ?? '',
      }),
    });

    if (!response.ok) {
      return { ok: false, reason: 'failed' };
    }

    const result = (await response.json()) as { success?: boolean };
    return result.success ? { ok: true } : { ok: false, reason: 'failed' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
