interface ButtonProps {
  text: string;
  etcClass?: string;
  actions: () => void;
}

const Button = ({ text, actions, etcClass }: ButtonProps) => {
  return (
    <button
      className={`relative flex  h-[50px]  w-32 items-center justify-center overflow-hidden rounded-lg bg-[#b83e3a] text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-primary before:duration-500 before:ease-out hover:shadow-primary hover:before:h-56  hover:before:w-56  ${etcClass}`}
      onClick={actions}
    >
      <span className="relative z-10">{text}</span>
    </button>
  );
};
export default Button;
