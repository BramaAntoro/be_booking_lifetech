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

export const updateRoomService = async (id, updateData) => {
  const existingRoom = await prisma.room.findUnique({ where: { id } });
  if (!existingRoom) throw new Error("Ruangan tidak ditemukan");

//   if (updateData.deviceId) {
//     const deviceUsed = await prisma.room.findFirst({
//       where: {
//         deviceId: updateData.deviceId,
//         NOT: { id: id }, 
//       },
//     });
//     if (deviceUsed)
//       throw new Error("Device ID sudah digunakan oleh ruangan lain");
//   }

  return await prisma.room.update({
    where: { id },
    data: updateData,
  });
};

export const deleteRoomService = async (id) => {
  const existingRoom = await prisma.room.findUnique({ where: { id } });
  if (!existingRoom) throw new Error("Ruangan tidak ditemukan");

  return await prisma.room.delete({
    where: { id },
  });
};