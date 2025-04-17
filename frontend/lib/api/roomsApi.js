import axios from "axios";

export async function getRooms() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rooms`
  );

  return response.data.data;
}
