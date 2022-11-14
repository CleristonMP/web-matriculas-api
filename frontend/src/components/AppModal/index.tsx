import {
  Modal,
  Header,
  Button,
  Icon,
  ModalProps,
  ButtonProps,
  Dimmer,
} from "semantic-ui-react";

import "./styles.css";

type Props = {
  open: boolean;
  onConfirmation: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  text: string;
  onClose: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    data: ModalProps | ButtonProps
  ) => void;
};

const AppModal = ({ open, text, onConfirmation, onClose }: Props) => {
  return (
    <Dimmer>
      <Modal
        open={open}
        onClose={onClose}
        size="fullscreen"
        dimmer="blurring"
        className="custom-modal"
      >
        <Header content="Aviso! Esta operação não poderá ser desfeita." />
        <Modal.Content>
          <p className="modal-text">{text}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={onClose}>
            <Icon name="cancel" /> Cancelar
          </Button>
          <Button color="red" onClick={onConfirmation}>
            <Icon name="delete" /> Excluir
          </Button>
        </Modal.Actions>
      </Modal>
    </Dimmer>
  );
};

export default AppModal;
