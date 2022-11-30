import withProtectedPage from "@/components/withProtectedPage";
import { Table, Space, Button, notification } from "antd";

const SubscriptionPage = () => {
  const handleAccept = () => {};

  const handleDecline = () => {};

  // const dataSource = (data || []).map((song) => {
  //   return {
  //     key: song.song_id,
  //     songTitle: song.Judul,
  //     songArtist: song.penyanyi_id,
  //   };
  // });

  const dataSource = [
    {
      key: "1",
      songTitle: "John Brown",
      songArtist: 32,
    },
    {
      key: "2",
      songTitle: "Jim Green",
      songArtist: 42,
    },
    {
      key: "3",
      songTitle: "Joe Black",
      songArtist: 32,
    },
  ];

  const columns = [
    {
      title: "Username",
      dataIndex: "songTitle",
      key: "songTitle",
      sorter: (a, b) => a.songTitle.localeCompare(b.songTitle),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      align: "center",
      fixed: "right",
      width: "200px",
      render: (_, record) => (
        <div className="flex justify-evenly">
          <Button type="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button type="danger" onClick={handleDecline}>
            Decline
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-14 py-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Subscription Management </h1>
      </div>
      <div className="py-2">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: dataSource.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} Requests`,
            defaultPageSize: 10,
            defaultCurrent: 1,
          }}
        />
      </div>
    </div>
  );
};

export default withProtectedPage(SubscriptionPage);
