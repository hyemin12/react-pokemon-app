import { useEffect, useRef, useState } from "react";
import DamageRelations from "./DamageRelations";
import useOnClickOutSide from "../../hooks/useOnClickOutSide";
import { DamageRelations as DamageRelationsProps } from "../../types/DamageRelationOfPokemonTypes";

interface DamageModalProps {
  open: boolean;
  damages: DamageRelationsProps[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DamageModal = ({ open, damages, setIsModalOpen }: DamageModalProps) => {
  const modalInnerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState<boolean>(true);

  const closeModalHandler = () => {
    setVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 200);
  };
  useOnClickOutSide(modalInnerRef, closeModalHandler);

  if (!open) return null;

  return (
    <div
      className={`flex items-center justify-center z-40 fixed left-0 bottom-0 w-full h-full bg-gray-800 ${
        visible
          ? "animate-[fadeIn_0.3s_linear]"
          : "animate-[fadeOut_0.3s_linear]"
      }`}
    >
      <div
        ref={modalInnerRef}
        className={`modal bg-white rounded-lg w-1/2 ${
          visible
            ? "animate-[slideDown_0.25s_ease-out_forwards]"
            : "animate-[slideUp_0.25s_ease-out_forwards]"
        }`}
      >
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full justify-between">
            <div className="text-gray-900 font-medium text-lg">데미지 관계</div>
            <span
              onClick={closeModalHandler}
              className="text-gray-900 font-medium text-lg cursor-pointer"
            >
              X
            </span>
          </div>

          <DamageRelations damages={damages} />
        </div>
      </div>
    </div>
  );
};

export default DamageModal;
