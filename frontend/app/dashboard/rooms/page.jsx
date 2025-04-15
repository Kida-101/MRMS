"use client";

import { getRooms } from "../../../lib/api/roomsApi";

const page = () => {
  const resp = getRooms();

  console.log(resp);
  return <div>Rooms</div>;
};

export default page;
