const OrderManageRepository = require("../repository/orderManagement.repository");
const { SeatsSearch } = require("./seatsSearchLogic");
const { v4: uuidv4 } = require("uuid");

class OrderManager {
  constructor() {
    this.orderRepo = new OrderManageRepository();
    this.seatsSearch = new SeatsSearch();
  }

  async createOrder(noOfSeats) {
    try {
      if (noOfSeats <= 0)
        return { status: 400, data: { msg: "please provide seats count>0" } };
      else if (noOfSeats > 7)
        return { status: 400, data: { msg: "please provide seats count<8" } };

      const seatsAvailable = await this.orderRepo.getAvaialbleSeats();
      if (seatsAvailable.length == 0)
        return {
          status: 404,
          data: { seatsBooked: [], seatsUnavailable: true },
        };
      if (seatsAvailable.length < noOfSeats)
        return {
          status: 404,
          data: { seatsBooked: [], limitExceed: true },
        };
      let matrix = this.generateMatrix(await this.orderRepo.getAllSeatsInfo());

      let reserveSeats = this.seatsSearch.priorityRowWiseLogic(
        matrix,
        noOfSeats
      );

      if (reserveSeats.length == 0) {
        console.log(seatsAvailable)
        reserveSeats = seatsAvailable.splice(0, noOfSeats)
        console.log('only',reserveSeats)
      }

      const res = await this.orderRepo.bookSeats(reserveSeats);
      return { status: 200, data: { seatsBooked: reserveSeats } };
    } catch (e) {
      return { status: 500, data: { msg: "something went wrong" } };
    }
  }
  async getBookedSeats() {
    try {
      const avaSeats = await this.orderRepo.getAvaialbleSeats({
        seatNo: 1,
        id: 0,
      });
      const bookedSeats = await this.orderRepo.getBookedSeats({
        seatNo: 1,
        id: 0,
      });

      return { status: 200, data: { seats: avaSeats, bookedSeats } };
    } catch (er) {
      return { status: 500, data: { msg: "something went wrong" } };
    }
  }

  generateMatrix(entries) {
    try {
      let matrix = [...new Array(13)].map((e) => new Array(8).fill(0));
      entries.sort((a, b) => a.seatNo - b.seatNo);
      let entry = 0;
      for (let i = 1; i <= Math.ceil(80 / 7); i++) {
        for (let j = 1; j <= 7; j++) {
          if (entry >= 79) break;
          if (i == 0 || j == 0) matrix[i][j] = 0;
          else {
            matrix[i][j] = entries[entry].isBooked == false ? 0 : 1;
          }
          entry++;
        }
      }
      return matrix;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = { OrderManager };
