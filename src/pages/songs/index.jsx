import AddSong from "@/components/AddSongModal";
import withProtectedPage from "@/components/withProtectedPage";
import { Table, Space, Button, notification } from "antd";
import {
  fetchSongs,
  deleteSong,
  createSong,
  updateSong,
} from "@/services/song";
import { useState, useEffect } from "react";
import DeleteSong from "@/components/DeleteSongModal";
import EditSong from "@/components/EditSongModal";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchSongsData = async () => {
    const response = await fetchSongs(user.user_id);
    setSongs(response);
  };

  useEffect(() => {
    fetchSongsData();
  }, []);

  const handleAdd = (payload) => {
    return new Promise(async (resolve, reject) => {
      createSong(payload)
        .then((res) => {
          console.log(res);
          if (!res) {
            notification.error({
              message: "Error",
              description:
                "Failed to add song (Make sure file type is correct)",
            });
            reject();
          } else {
            fetchSongsData();
            notification.success({
              message: "Success",
              description: "Song added successfully",
            });
            resolve();
          }
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
          });
          reject(err);
        });
    });
  };

  const handleEdit = (key, payload) => {
    return new Promise((resolve, reject) => {
      updateSong(key, payload)
        .then((res) => {
          if (!res) {
            notification.error({
              message: "Error",
              description: "Failed to edit song",
            });
            reject();
          } else {
            fetchSongsData();
            notification.success({
              message: "Success",
              description: "Song updated successfully",
            });
            resolve();
          }
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
          });
          reject();
        });
    });
  };

  const handleDelete = (key) => {
    return new Promise((resolve, reject) => {
      deleteSong(key)
        .then((res) => {
          if (!res) {
            notification.error({
              message: "Error",
              description: "Failed to delete song",
            });
            reject();
          } else {
            fetchSongsData();
            notification.success({
              message: "Success",
              description: "Song has been deleted",
            });
            resolve();
          }
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: "Error",
            description: "Error deleting song",
          });
          reject();
        });
    });
  };

  const data = songs && songs.data?.songs;
  const dataSource = (data || []).map((song) => {
    return {
      key: song.song_id,
      songTitle: song.Judul,
      songArtist: song["user.name"],
    };
  });

  const columns = [
    {
      title: "Song Title",
      dataIndex: "songTitle",
      key: "songTitle",
      sorter: (a, b) => a.songTitle.localeCompare(b.songTitle),
    },
    {
      title: "Song Artist",
      dataIndex: "songArtist",
      key: "songArtist",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      align: "center",
      fixed: "right",
      width: "200px",
      render: (_, record) => (
        <div className="flex justify-evenly">
          <EditSong dataRow={record} handleEdit={handleEdit} />
          <DeleteSong dataRow={record} handleDelete={handleDelete} />
        </div>
      ),
    },
  ];

  return (
    <div className="px-14 py-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Song Management </h1>
        <AddSong handleAdd={handleAdd} />
      </div>
      <div className="py-2">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: dataSource.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} Songs`,
            defaultPageSize: 10,
            defaultCurrent: 1,
          }}
        />
      </div>
    </div>
  );
};

export default withProtectedPage(SongsPage);
