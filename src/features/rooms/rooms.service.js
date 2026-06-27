import prisma from "../../lib/prismaClient.js";

export const createRoomService = async ({ name }) => {
  return await prisma.room.create({
    data: { name },
  });
};

export const getAllRoomsService = async () => {
  return await prisma.room.findMany({
    orderBy: { createdAt: "desc" },
  });
};
