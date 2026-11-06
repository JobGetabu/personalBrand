"use client";
import { useEffect, useRef, useState } from "react";
import { useLatest } from "@/lib/hooks";

/**
 * Web Audio visualiser. The sound is synthesised in the browser (no audio files, no licensing)
 * and only starts on an explicit tap; it stops when the card leaves the screen.
 */
export default function Waveform({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const audio = useRef<{ ctx: AudioContext; analyser: AnalyserNode; stop: () => void } | null>(null);
  const [playing, setPlaying] = useState(false);
  const activeRef = useLatest(active);

  const start = () => {
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    const master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(analyser).connect(ctx.destination);
    const notes = [220, 277.18, 329.63, 415.3];
    const oscs = notes.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "triangle" : "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15 + i * 0.07;
      const lg = ctx.createGain();
      lg.gain.value = 0.25;
      lfo.connect(lg).connect(g.gain);
      o.connect(g).connect(master);
      o.start();
      lfo.start();
      return [o, lfo];
    });
    audio.current = {
      ctx,
      analyser,
      stop: () => {
        oscs.flat().forEach((o) => o.stop());
        ctx.close();
      },
    };
    setPlaying(true);
  };
  const stop = () => {
    audio.current?.stop();
    audio.current = null;
    setPlaying(false);
  };

  useEffect(() => {
    // Stop the sound when the card scrolls away (syncing an external system).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!active && playing) stop();
  }, [active, playing]);
  useEffect(() => () => audio.current?.stop(), []);

  useEffect(() => {
    const c = canvas.current!;
    const g = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio, 2);
    c.width = c.clientWidth * dpr;
    c.height = c.clientHeight * dpr;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#3DFFA2";
    const data = new Uint8Array(256);
    let raf = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!activeRef.current) return;
      const W = c.width,
        H = c.height;
      g.clearRect(0, 0, W, H);
      const a = audio.current?.analyser;
      if (a) a.getByteTimeDomainData(data);
      for (let k = 0; k < 3; k++) {
        g.beginPath();
        g.strokeStyle = accent;
        g.globalAlpha = 1 - k * 0.3;
        g.lineWidth = (2 - k * 0.5) * dpr;
        for (let i = 0; i < 256; i++) {
          const x = (i / 255) * W;
          const v = a ? (data[i] - 128) / 128 : Math.sin(i * 0.08 + t * 0.002 + k) * 0.08;
          const y = H / 2 + v * H * 0.4 * (1 + k * 0.4) + Math.sin(i * 0.03 + t * 0.001) * k * 6 * dpr;
          if (i === 0) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.stroke();
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [activeRef]);

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <canvas ref={canvas} className="min-h-0 w-full flex-1" aria-hidden="true" />
      <button
        type="button"
        onClick={playing ? stop : start}
        aria-pressed={playing}
        className="min-h-11 rounded-full border hairline font-mono text-xs hover:border-accent"
      >
        {playing ? "■ Stop sound" : "▶ Play sound"}
      </button>
    </div>
  );
}
