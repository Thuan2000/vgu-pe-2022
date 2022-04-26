import router from "next/router";

export const scrollToSection = (
  elementRef: React.RefObject<HTMLDivElement>
) => {
  elementRef.current?.scrollIntoView({
    behavior: "smooth",
    inline: "end",
  });
};

export function changeSection(newPosition: number) {
  const { pathname, query } = router;
  router.replace({
    pathname,
    query: { ...query, formPosition: newPosition },
  });
}
