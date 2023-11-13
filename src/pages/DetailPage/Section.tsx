interface SectionProps {
  title: string | undefined;
  children: React.ReactNode;
  width: string;
}
const Section = ({ title, children, width }: SectionProps) => {
  return (
    <section
      className={`${width} flex flex-col justify-center items-center m-auto py-4`}
    >
      {title && (
        <h2 className="mb-3 text-[1.3em] text-base font-semibold dark:text-white text-zinc-600">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};
export default Section;
