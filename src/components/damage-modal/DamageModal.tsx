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
      className={`fixed bottom-0 left-0 z-40 flex h-full w-full items-center justify-center bg-gray-800 ${
        visible
          ? "animate-[fadeIn_0.3s_linear]"
          : "animate-[fadeOut_0.3s_linear]"
      }`}
    >
      <div
        ref={modalInnerRef}
        className={`modal w-1/2 rounded-lg bg-white ${
          visible
            ? "animate-[slideDown_0.25s_ease-out_forwards]"
            : "animate-[slideUp_0.25s_ease-out_forwards]"
        }`}
      >
        <div className="flex flex-col items-start p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-lg font-medium text-gray-900">데미지 관계</div>
            <span
              onClick={closeModalHandler}
              className="cursor-pointer text-lg font-medium text-gray-900"
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
