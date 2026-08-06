// @ts-nocheck
'use client';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    // @ts-expect-error React 19 type mismatch
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
