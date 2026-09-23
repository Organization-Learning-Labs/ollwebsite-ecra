'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import { useOllieBotOptional } from '@/components/oll-bot/OllieBotContext';

const LINES = [
  "Hi, I'm Ollie, your assessment readiness capability guide at OLL.",
  "Tell me your industry and I'll find the research for you.",
  "Not sure where your gaps are? Start with a 25-minute assessment.",
  "Want to see how a similar firm closed the same gap?",
];

export default function Ollie() {
  const pathname = usePathname();
  const ollieBot = useOllieBotOptional();
  const [gone, setGone] = useState(false);
  const [bubbleIn, setBubbleIn] = useState(false);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const [done, setDone] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const chatOpen = ollieBot?.open ?? false;
  const hideOnPilot = pathname?.startsWith('/pilot');

  function clearAll() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  useEffect(() => {
    if (hideOnPilot || chatOpen) {
      clearAll();
      return;
    }

    const later = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setText(LINES[0]);
      setDone(true);
      setBubbleIn(true);
      return clearAll;
    }

    let i = 0;
    function cycle() {
      clearAll();
      const line = LINES[i % LINES.length];
      setText('');
      setDone(true);
      setTyping(true);
      setBubbleIn(true);
      later(() => {
        setTyping(false);
        setDone(false);
        let c = 0;
        const type = () => {
          c++;
          setText(line.slice(0, c));
          if (c < line.length) later(type, 24);
          else {
            setDone(true);
            later(() => {
              setBubbleIn(false);
              later(() => {
                i++;
                cycle();
              }, 500);
            }, 3200);
          }
        };
        type();
      }, 900);
    }

    later(cycle, 1200);
    return clearAll;
  }, [hideOnPilot, chatOpen]);

  function hidePreview() {
    clearAll();
    setGone(true);
  }

  function handleOpen(e: MouseEvent) {
    e.preventDefault();
    hidePreview();
    ollieBot?.openChat();
  }

  if (hideOnPilot || chatOpen) return null;

  return (
    <div className="ollie" id="ollie">
      <div className={`ollie-preview${gone ? ' gone' : ''}`} id="ollie-preview" aria-hidden="true">
        <div className={`pv-bubble${bubbleIn ? ' in' : ''}`} id="pv-bubble">
          <span className={`pv-typing${typing ? ' on' : ''}`} id="pv-typing">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span className={`pv-text${done ? ' done' : ''}`} id="pv-text">
            {text}
          </span>
        </div>
      </div>
      <div className="ollie-row">
        <button className="pv-dismiss" id="pv-dismiss" aria-label="Hide message preview" onClick={hidePreview}>
          <svg viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <button
          type="button"
          className="ollie-fab"
          id="ollie-fab"
          aria-label="Chat with Ollie"
          onClick={handleOpen}
        >
          <span className="ollie-av" aria-hidden="true">
            O
          </span>
          <span className="ollie-fab-label">Ask Ollie</span>
          <span className="ollie-dot" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}
