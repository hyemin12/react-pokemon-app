const Footer = () => {
  const year: number = new Date().getFullYear();
  return (
    <footer className="h-[56px] bg-slate-800 py-5 text-center">
      <p className="text-xs text-slate-400">ⓒ {year} hyemin</p>
    </footer>
  );
};
export default Footer;
