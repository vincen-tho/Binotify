import { Button, Modal, Input, Form, notification } from "antd";
import { useState } from "react";

const EditSong = ({ dataRow, handleEdit }) => {
  const [visible, setVisible] = useState(false);
  const [postData, setPostData] = useState({});
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
    setPostData({ Judul: dataRow.songTitle });
    form.setFieldValue("songTitle", dataRow.songTitle);
    document.getElementById("songFile") &&
      (document.getElementById("songFile").value = "");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    form.validateFields().then(async () => {
      const formData = new FormData();
      formData.append("Judul", postData.Judul);
      formData.append("file", postData.file);
      handleEdit(dataRow.key, formData)
        .then(() => {
          setVisible(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>

      <Modal
        title={"Edit Song"}
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
        <h1 className="flex justify-end mt-4 text-red-500 text-sm">
          Song file can be left empty to not update
        </h1>
      </Modal>
    </>
  );
};

export default EditSong;
