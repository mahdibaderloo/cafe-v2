import useModalStore from "../../store/modal";
import ModalItemForm from "./ModalItemForm";
// import ModalSubmit from "./ModalSubmit";

export default function Modal() {
  const { closeModal } = useModalStore();

  return (
    <div className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center">
      <div
        className="bg-black/60 w-full h-full absolute top-0 left-0"
        onClick={() => closeModal()}
      />
      <ModalItemForm />
      {/* <ModalSubmit /> */}
    </div>
  );
}
