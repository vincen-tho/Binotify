import { Button, Modal, Input, Form, notification } from "antd";
import { useState } from "react";
import { createSong } from "@/services/song";

const AddSong = ({ handleAdd }) => {
  const [visible, setVisible] = useState(false);
  const [postData, setPostData] = useState({});
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
    setPostData({});
    form.resetFields();
    document.getElementById("songFile") &&
      (document.getElementById("songFile").value = "");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    if (document.getElementById("songFile").value != "") {
      form.validateFields().then(async () => {
        const formData = new FormData();
        formData.append("Judul", postData.Judul);
        formData.append("file", postData.file);
        handleAdd(formData).then(() => {
          setVisible(false);
        });
      });
    } else {
      notification.error({
        message: "Error",
        description: "Please upload song file",
      });
    }
  };

  return (
    <>
      <Button type="green" className="mr-12" onClick={showModal}>
        Add Song
      </Button>

      <Modal
        title={"Add Song"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
      >
        <Form form={form}>
          Song Title
          <Form.Item
            name="songTitle"
            rules={[{ required: true, message: "Please input Song Title!" }]}
          >
            <Input
              onChange={() => {
                setPostData({
                  ...postData,
                  Judul: form.getFieldValue("songTitle"),
                });
              }}
            />
          </Form.Item>
          Song File
          <input
            id="songFile"
            type="file"
            name="songFile"
            accept="audio/*"
            onChange={(e) => {
              setPostData({
                ...postData,
                file: e.target.files[0],
              });
            }}
            required
          />
        </Form>
      </Modal>
    </>
  );
};

export default AddSong;
