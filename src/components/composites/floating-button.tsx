"use client";

import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";
import Link from "next/link";

export default function FloatingButton() {
  return (
    <Button
      asChild
      className="pointer-events-auto fixed bottom-16 right-12 z-[200] size-16 rounded-full bg-red-500 shadow-xl hover:bg-red-700"
    >
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSd7lxY5ferUUezYyoOu8VsPwjTryJPQJiqUE_a0kbkyntBE1w/viewform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Bug size={64} />
      </Link>
    </Button>
  );
}
