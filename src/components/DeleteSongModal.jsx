import { Button, Modal, Form, Input, notification } from "antd";
import Icon, { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const DeleteSong = ({ dataRow, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    handleDelete(dataRow.key).then(() => {
      setVisible(false);
    });
  };

  return (
    <>
      <Button type="danger" onClick={showModal}>
        Delete
      </Button>

      <Modal
        title={"Delete Song"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <h1 className={"text-xl font-bold"}>
          Are you sure you want to delete this song?
        </h1>
        <h1>Song Title: {dataRow.songTitle}</h1>
        <h1>Song Artist: {dataRow.songArtist}</h1>
      </Modal>
    </>
  );
};

export default DeleteSong;
