import { Router } from "express";
import { createBooking } from "./bookings.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createBookingSchema } from "./booking.validation.js";

const bookingRoutes = Router();

bookingRoutes.post("/", validate(createBookingSchema), createBooking);

export default bookingRoutes;