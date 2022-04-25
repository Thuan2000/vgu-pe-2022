export const scrollToSection = (
  elementRef: React.RefObject<HTMLDivElement>
) => {
  elementRef.current?.scrollIntoView({
    behavior: "smooth",
    inline: "end",
  });
};
