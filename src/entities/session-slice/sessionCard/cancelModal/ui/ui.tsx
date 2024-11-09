import { IAuction } from "@/shared/interface/auction";
import { Input, Modal } from "antd";

export const CancelModal = ({
  isOpen,
  session,
  setIsOpen,
}: {
  isOpen: boolean;
  session?: IAuction;
  setIsOpen: (arg: boolean) => void;
}) => {
  return (
    <>
      <Modal
        open={isOpen}
        centered
        onCancel={() => setIsOpen(false)}
        title={`Вы хотите отменить сессию №${session?.auctionId}?`}
      >
        <Input
          size="large"
          placeholder="Введите причину отклонения"
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
};
