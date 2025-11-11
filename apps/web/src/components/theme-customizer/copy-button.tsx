"use client";

import { Event, trackEvent } from "@/utils/events";

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error("Failed to copy to clipboard", error);
  }
  if (event) {
    trackEvent(event);
  }
}
