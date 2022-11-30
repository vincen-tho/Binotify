import { api } from "./api";

export async function fetchSongs(user_id) {
  return await api.get(`/songs?penyanyi_id=${user_id}`);
}

export async function createSong(payload) {
  return await api.request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "/songs",
    data: payload,
    method: "POST",
  });
}

export async function updateSong(song_id, payload) {
  return await api.request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `/songs?song_id=${song_id}`,
    data: payload,
    method: "PUT",
  });
}

export async function deleteSong(song_id) {
  return await api.delete(`/songs?song_id=${song_id}`);
}
