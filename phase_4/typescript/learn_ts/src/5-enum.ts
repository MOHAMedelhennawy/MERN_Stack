enum BookingStatus {
    initial = "initial",
    paid = "paid",
    cancelled = "cancelled",
}

let bookingStatus:BookingStatus;

// bookingStatus = "initial" // error
// bookingStatus = true // error
// bookingStatus = 5 // error


bookingStatus = BookingStatus.initial; // it's work