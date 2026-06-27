import prisma from "../../lib/prismaClient.js";

export const createBookingService = async ({ userId, roomId, bookedByName, startTime }) => {
  const inputStart = new Date(startTime);
  
  const inputEnd = new Date(inputStart.getTime() + 30 * 60 * 1000); 

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) throw new Error("Ruangan tidak ditemukan");
  if (room.status === "MAINTENANCE") throw new Error("Ruangan sedang dalam perbaikan, tidak bisa di-booking");

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      roomId: roomId,
      status: "ACTIVE",
      AND: [
        { startTime: { lt: inputEnd } },
        { endTime: { gt: inputStart } }
      ]
    }
  });

  if (conflictingBooking) {
    throw new Error("Jadwal tabrakan! Ruangan sudah di-booking pada rentang 3 menit tersebut");
  }

  return await prisma.booking.create({
    data: {
      userId,
      roomId,
      bookedByName,
      startTime: inputStart,
      endTime: inputEnd, 
      status: "ACTIVE"
    }
  });
};