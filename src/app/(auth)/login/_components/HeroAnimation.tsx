"use client";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  CalendarFold,
  FileCode,
  FileQuestion,
  FolderCheck,
  Stamp,
  UserRound,
} from "lucide-react";

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <UserRound />
          </Circle>
          <Circle ref={div5Ref}>
            <FileQuestion />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <FileCode />
          </Circle>
          <Circle ref={div4Ref} className="size-18">
            {/* <FileQuestion /> */}
            <span className="font-mono font-bold text-indigo-800">DevLens</span>
          </Circle>
          <Circle ref={div6Ref}>
            <CalendarFold />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Stamp />
          </Circle>
          <Circle ref={div7Ref}>
            <FolderCheck />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        pathColor={"white"}
        pathOpacity={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        pathColor={"white"}
        pathOpacity={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        pathColor={"white"}
        pathOpacity={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
        pathColor={"white"}
        pathOpacity={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
        pathColor={"white"}
        pathOpacity={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
        pathColor={"white"}
        pathOpacity={0.4}
      />
    </div>
  );
}

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";
