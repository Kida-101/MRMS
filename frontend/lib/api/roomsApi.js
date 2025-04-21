import axios from "axios";

export async function getRooms() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rooms`
  );

  return response.data.data;
}

export async function getVacantRooms() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rooms/vacant`
  );

  return response.data.data;
}
