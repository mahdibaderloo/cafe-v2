import useModalStore from "../../store/modal";
import ModalAddDiscount from "./ModalAddDiscount";
import ModalAddItem from "./ModalAddItem";
import ModalDiscountInfo from "./ModalDiscountInfo";
import ModalEditItem from "./ModalEditItem";
import ModalOrder from "./ModalOrder";
import ModalSubmit from "./ModalSubmit";

export default function Modal() {
  const { closeModal, type } = useModalStore();

  return (
    <div className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center">
      <div
        className="bg-black/60 w-full h-full absolute top-0 left-0"
        onClick={() => closeModal()}
      />
      {type === "edit-item" && <ModalEditItem />}
      {type === "add-item" && <ModalAddItem />}
      {type === "order" && <ModalOrder />}
      {type === "submit" && <ModalSubmit />}
      {type === "discount-info" && <ModalDiscountInfo />}
      {type === "add-discount" && <ModalAddDiscount />}
    </div>
  );
}
