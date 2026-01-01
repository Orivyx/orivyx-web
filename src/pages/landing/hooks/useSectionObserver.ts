import { useEffect, useState } from "react";

export function useSectionObserver(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const visibilityMap: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap[entry.target.id] = entry.intersectionRatio;
        });
        const mostVisibleSection = Object.keys(visibilityMap).reduce((a, b) =>
          visibilityMap[a] > visibilityMap[b] ? a : b
        );

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
