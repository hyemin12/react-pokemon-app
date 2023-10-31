import NavBar from "./NavBar";

const GeneralLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default GeneralLayout;
