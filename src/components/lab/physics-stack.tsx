"use client";
import { useEffect, useRef, useState } from "react";
import { useLatest } from "@/lib/hooks";

/**
 * cannon-es tower of app-icon tiles, constrained to 2D (z locked) and drawn on a 2D canvas.
 * The world only steps while visible and after the first interaction; bodies sleep at rest.
 */
export default function PhysicsStack({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ knock: (x?: number) => void; reset: () => void } | null>(null);
  const [started, setStarted] = useState(false);
  const activeRef = useLatest(active);

  useEffect(() => {
    let raf = 0;
    let disposed = false;
    import("cannon-es").then((CANNON) => {
      if (disposed) return;
      const c = canvas.current!;
      const g = c.getContext("2d")!;
      const dpr = Math.min(devicePixelRatio, 2);
      const W = (c.width = c.clientWidth * dpr);
      const H = (c.height = c.clientHeight * dpr);
      const S = W / 10; // px per metre
      const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0), allowSleep: true });
      const ground = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
      ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
      world.addBody(ground);
      [-0.2, 10.2].forEach((x) => {
        const wall = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(0.2, 20, 2)) });
        wall.position.set(x, 10, 0);
        world.addBody(wall);
      });
      const coarse = matchMedia("(pointer: coarse)").matches;
      const rows = coarse ? 5 : 7;
      const css = getComputedStyle(document.documentElement);
      const colors = [
        css.getPropertyValue("--accent").trim(),
        css.getPropertyValue("--violet").trim(),
        css.getPropertyValue("--text").trim(),
      ];
      const size = 0.42;
      let boxes: { body: InstanceType<typeof CANNON.Body>; color: string }[] = [];
      const build = () => {
        boxes.forEach((b) => world.removeBody(b.body));
        boxes = [];
        for (let r = 0; r < rows; r++)
          for (let k = 0; k < 3; k++) {
            const body = new CANNON.Body({ mass: 1, shape: new CANNON.Box(new CANNON.Vec3(size, size, size)) });
            body.position.set(4.1 + k * (size * 2 + 0.02), size + r * (size * 2 + 0.01), 0);
            body.linearFactor.set(1, 1, 0);
            body.angularFactor.set(0, 0, 1);
            body.sleepSpeedLimit = 0.2;
            world.addBody(body);
            boxes.push({ body, color: colors[(r + k) % 3] });
          }
      };
      build();
      const ball = new CANNON.Body({ mass: 4, shape: new CANNON.Sphere(0.35) });
      ball.linearFactor.set(1, 1, 0);
      ball.position.set(-5, 1, 0);
      world.addBody(ball);
      let running = false;
      api.current = {
        knock: (x = 1) => {
          running = true;
          ball.position.set(x < 5 ? 0.5 : 9.5, 1.2, 0);
          ball.velocity.set(x < 5 ? 14 : -14, 3, 0);
          ball.wakeUp();
        },
        reset: () => {
          build();
          ball.position.set(-5, 1, 0);
          ball.velocity.set(0, 0, 0);
          running = false;
        },
      };
      const draw = () => {
        g.clearRect(0, 0, W, H);
        boxes.forEach(({ body, color }) => {
          g.save();
          g.translate(body.position.x * S, H - body.position.y * S);
          const q = body.quaternion;
          const angle = 2 * Math.atan2(q.z, q.w);
          g.rotate(-angle);
          g.fillStyle = color;
          g.globalAlpha = 0.85;
          const s = size * 2 * S - 2 * dpr;
          g.beginPath();
          g.roundRect(-s / 2, -s / 2, s, s, s * 0.28);
          g.fill();
          g.restore();
        });
        if (ball.position.x > -1) {
          g.globalAlpha = 1;
          g.fillStyle = colors[2];
          g.beginPath();
          g.arc(ball.position.x * S, H - ball.position.y * S, 0.35 * S, 0, Math.PI * 2);
          g.fill();
        }
      };
      let last = performance.now();
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min((t - last) / 1000, 0.05);
        last = t;
        if (!activeRef.current) return;
        if (running) world.step(1 / 60, dt, 3);
        draw();
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, [activeRef]);

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <canvas
        ref={canvas}
        className="min-h-0 w-full flex-1 cursor-pointer"
        aria-hidden="true"
        onPointerDown={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          api.current?.knock(((e.clientX - r.left) / r.width) * 10);
          setStarted(true);
        }}
      />
      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => (api.current?.knock(), setStarted(true))}
          className="min-h-11 rounded-full bg-accent font-mono text-[11px] text-accent-ink"
        >
          Knock it over
        </button>
        <button
          type="button"
          onClick={() => api.current?.reset()}
          disabled={!started}
          className="min-h-11 rounded-full border hairline font-mono text-[11px] text-muted disabled:opacity-40"
        >
          Rebuild
        </button>
      </div>
    </div>
  );
}
