import prisma from "../../lib/prismaClient.js";

export const createRoomService = async ({ name }) => {
  return await prisma.room.create({
    data: { name },
  });
};