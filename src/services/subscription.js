import { api } from "./api";

export async function fetchSubscriptions() {
  return await api.get("/subscriptions?pending=true");
}

export async function postSubscriptions(payload) {
  return await api.post("/subscriptions", payload);
}
