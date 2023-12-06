interface SectionProps {
  title: string | undefined;
  children: React.ReactNode;
  width: string;
}
const Section = ({ title, children, width }: SectionProps) => {
  return (
    <section
      className={`${width} m-auto flex flex-col items-center justify-center py-4`}
    >
      {title && (
        <h2 className="mb-3 text-[1.3em] text-base font-semibold text-zinc-600 dark:text-white">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};
export default Section;
