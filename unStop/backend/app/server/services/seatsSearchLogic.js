const OrderManageRepository = require("../repository/orderManagement.repository");
const { v4: uuidv4 } = require("uuid");

class SeatsSearch {
  constructor() {}
  priorityRowWiseLogic(matrix, seats) {
    try {
      let seatsReserve = [];
      for (let i = 1; i <= 12; i++) {
        let maxSeats = 7;
        if (i == 12) maxSeats = 3;

        for (let j = 1; j <= maxSeats - seats + 1; j++) {
          let ava = 0;
          for (let k = j; k <= j + seats - 1; k++) {
            if (matrix[i][k] == 0) ava += 1;
          }

          if (ava == seats) {
            let seatStart = (i - 1) * 7 + 1;

            for (let k = seatStart + j - 1; k <= seatStart + j - 2 + seats; k++)
              seatsReserve.push(k);

            return seatsReserve;
          }
        }
      }
      return seatsReserve;
    } catch (e) {
      throw e
    }
  }
  nearByLogic(matrix, seats) {}
}

module.exports = { SeatsSearch };
