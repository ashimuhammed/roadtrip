"use client";

import React, { useState, useEffect } from "react";
import AiTripAssistantModal from "./AiTripAssistantModal";
import FloatingAiButton from "./FloatingAiButton";

export default function AiAssistantGlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setInitialPrompt(customEvent.detail?.prompt);
      setIsModalOpen(true);
    };

    window.addEventListener("open-ai-trip-modal", handleOpen);
    return () => window.removeEventListener("open-ai-trip-modal", handleOpen);
  }, []);

  return (
    <>
      {children}
      <FloatingAiButton onClick={() => setIsModalOpen(true)} />
      <AiTripAssistantModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInitialPrompt(undefined);
        }}
        initialPrompt={initialPrompt}
      />
    </>
  );
}

// Global helper to trigger AI Assistant from any component
export function triggerAiAssistant(prompt?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-ai-trip-modal", { detail: { prompt } })
    );
  }
}

