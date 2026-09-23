'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type OllieBotContextValue = {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
  setOpen: (open: boolean) => void;
};

const OllieBotContext = createContext<OllieBotContextValue | null>(null);

export function OllieBotProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openChat, closeChat, setOpen }),
    [open, openChat, closeChat]
  );

  return (
    <OllieBotContext.Provider value={value}>{children}</OllieBotContext.Provider>
  );
}

export function useOllieBot() {
  const ctx = useContext(OllieBotContext);
  if (!ctx) {
    throw new Error('useOllieBot must be used within OllieBotProvider');
  }
  return ctx;
}

/** Safe optional access when provider may be absent (e.g. pilot-only mount). */
export function useOllieBotOptional() {
  return useContext(OllieBotContext);
}
