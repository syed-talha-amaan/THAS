let bookedSeatsCount = document.querySelector(".booked_seats")
let remainingSeatsCount = document.querySelector(".remaining_seats")
let totalSeats = 36
let bookedCount = 0
let seating = document.querySelector(".seating")

function seatbook(event) {
    event.target.classList.toggle("booked")
    event.target.classList.contains("booked") ? bookedCount++ : bookedCount--;
    bookedSeatsCount.innerHTML = bookedCount
    remainingSeatsCount.innerHTML = totalSeats - bookedCount
}

bookedSeatsCount.innerHTML = bookedCount
remainingSeatsCount.innerHTML = totalSeats - bookedCount

for (let i = 0; i < totalSeats; i++) {
    let seat = document.createElement("div")
    seating.append(seat)
    seat.className = "seat"
    seat.addEventListener("click", seatbook)
}