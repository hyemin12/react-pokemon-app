const Footer = () => {
  const year: number = new Date().getFullYear();
  return (
    <footer className="text-center py-5 bg-slate-800 h-[56px]">
      <p className="text-xs text-slate-400">ⓒ {year} hyemin</p>
    </footer>
  );
};
export default Footer;
