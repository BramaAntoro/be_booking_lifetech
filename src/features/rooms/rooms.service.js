import prisma from "../../lib/prismaClient.js";

export const createRoomService = async ({ name }) => {
  return await prisma.room.create({
    data: { name },
  });
};

export const getAllRoomsService = async () => {
  const now = new Date();

  const rooms = await prisma.room.findMany({
    include: {
      bookings: {
        where: {
          status: "ACTIVE",
          endTime: { gte: now } 
        },
        orderBy: { startTime: "asc" },
        take: 1 
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return rooms.map((room) => {
    let warna = "blue"; 

    if (room.status === "MAINTENANCE") {
      warna = "grey"; 
    } else {
      const bookingTerdekat = room.bookings[0];

      if (bookingTerdekat) {
        const start = new Date(bookingTerdekat.startTime);
        const end = new Date(bookingTerdekat.endTime);

        if (now >= start && now <= end) {
          warna = "red";
        } 
        else if (start - now <= 5 * 60 * 1000 && now < start) {
          warna = "yellow";
        }
      }
    }

    return {
      id: room.id,
      name: room.name,
      deviceId: room.deviceId,
      status: room.status,
      displayColor: warna,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt
    };
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