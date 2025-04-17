import Router from "express";
import {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  getVacantRooms,
} from "../controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/rooms", createRoom);
roomRouter.get("/rooms", getRooms);
roomRouter.get("/rooms/vacant", getVacantRooms);
roomRouter.get("/rooms/:id", getRoom);
roomRouter.put("/rooms/:id", updateRoom);
roomRouter.delete("/rooms/:id", deleteRoom);

export default roomRouter;
