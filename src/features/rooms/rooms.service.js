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
          endTime: { gte: now },
        },
        orderBy: { startTime: "asc" },
        take: 1,
      },
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
        } else if (start - now <= 5 * 60 * 1000 && now < start) {
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
      updatedAt: room.updatedAt,
    };
  });
};

export const getRoomByIdService = async (id) => {
  const now = new Date();

  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      bookings: {
        where: {
          status: "ACTIVE",
          endTime: { gte: now },
        },
        select: {
          id: true,
          bookedByName: true,
          startTime: true,
          endTime: true,
          status: true,
        },
        orderBy: {
          startTime: "asc",
        },
      },
    },
  });

  if (!room) return null;

  let warna = "blue";
  if (room.status === "MAINTENANCE") {
    warna = "grey";
  } else if (room.bookings.length > 0) {
    const bookingTerdekat = room.bookings[0];
    const start = new Date(bookingTerdekat.startTime);
    const end = new Date(bookingTerdekat.endTime);

    if (now >= start && now <= end) {
      warna = "red";
    } else if (start - now <= 5 * 60 * 1000 && now < start) {
      warna = "yellow";
    }
  }

  return {
    id: room.id,
    name: room.name,
    deviceId: room.deviceId,
    status: room.status,
    displayColor: warna,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    bookedSchedules: room.bookings,
  };
};

export const updateRoomService = async (id, updateData) => {
  const existingRoom = await prisma.room.findUnique({ where: { id } });
  if (!existingRoom) throw new Error("Ruangan tidak ditemukan");

  if (updateData.deviceId) {
    const deviceUsed = await prisma.room.findFirst({
      where: {
        deviceId: updateData.deviceId,
        NOT: { id: id },
      },
    });
    if (deviceUsed)
      throw new Error("Device ID sudah digunakan oleh ruangan lain");
  }

  if (updateData.status === "MAINTENANCE") {
    const now = new Date();

    const activeBookingExists = await prisma.booking.findFirst({
      where: {
        roomId: id,
        status: "ACTIVE",
        endTime: {
          gte: now,
        },
      },
    });

    if (activeBookingExists) {
      throw new Error(
        "Gagal mengubah status! Masih ada jadwal booking yang aktif atau akan datang di ruangan ini",
      );
    }
  }

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
