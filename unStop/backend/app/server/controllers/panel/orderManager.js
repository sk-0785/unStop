const { SeatsModel } = require("../../../../db/models/seats");
const { OrderManager } = require("../../services/orderManagementService");

async function bookSeats(req, res, next) {

  try {
    let { no_of_seats } = req.body
    if(!no_of_seats ||no_of_seats.length ==0  )
    return res.status(400).json({msg   :'please provide valid array'})
    const orderManager = new OrderManager();
    const { status, data } = await orderManager.createOrder(no_of_seats);
    return res.status(status).json(data);
  } catch (e) {
    return res.status(500).json({
      status: 500,
      type: "SERVER",
      message: `exception occured while scheduling job ${e}`,
      debug_message: "error while schedule job",
    }); 
  }
}

async function getSeatsBooked(req, res, next) {
  try {
    const orderManager = new OrderManager();
    const { status, data } = await orderManager.getBookedSeats(req);
    return res.status(status).send(data);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      type: "SERVER",
      message: `exception occured while scheduling job ${e}`,
      debug_message: "error while schedule job",
    });
  }
}

module.exports = {
  bookSeats,
  getSeatsBooked,
};
