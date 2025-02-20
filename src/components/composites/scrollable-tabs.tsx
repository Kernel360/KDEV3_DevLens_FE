"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ScrollableTabsProps extends React.ComponentProps<typeof Tabs> {
  items: Array<{
    value: string;
    label: string;
    href?: string;
  }>;
  LinkComponent?: React.ComponentType<{
    href: string;
    replace?: boolean;
    children: React.ReactNode;
  }>;
}

export function ScrollableTabs({
  items,
  LinkComponent,
  className,
  ...props
}: ScrollableTabsProps) {
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = React.useState(false);
  const [showRightButton, setShowRightButton] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (!tabsRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth);
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!tabsRef.current) return;

    const scrollAmount = 200;
    const newScrollLeft =
      tabsRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    tabsRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 100);
  };

  return (
    <Tabs {...props} className={className}>
      <div className="relative flex items-center">
        {showLeftButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 z-10 h-8 w-8 rounded-full bg-background shadow-sm"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}
        <TabsList
          ref={tabsRef}
          className="flex w-fit items-center justify-start overflow-x-auto scrollbar-hide"
          onScroll={checkScroll}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: showLeftButton ? "2rem" : "0.5rem",
            paddingRight: showRightButton ? "2rem" : "0.5rem",
          }}
        >
          {items.map((item) => {
            const trigger = (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            );

            if (item.href && LinkComponent) {
              return (
                <LinkComponent key={item.value} href={item.href} replace>
                  {trigger}
                </LinkComponent>
              );
            }

            return trigger;
          })}
        </TabsList>
        {showRightButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 z-10 h-8 w-8 rounded-full bg-background shadow-sm"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}
      </div>
    </Tabs>
  );
}
