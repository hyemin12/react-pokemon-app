const Footer = () => {
  const year: number = new Date().getFullYear();
  return (
    <footer className="text-center py-5 bg-slate-800">
      <p className="text-xs text-slate-400">ⓒ {year} hyemin</p>
      <p className="text-xs text-slate-400">공부용으로 제작된 페이지입니다.</p>
    </footer>
  );
};
export default Footer;
