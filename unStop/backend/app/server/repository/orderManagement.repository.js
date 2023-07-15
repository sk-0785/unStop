const { SeatsModel } = require("../../../db/models/seats");
const mongoose = require("mongoose");
const { nextTick } = require("async");

class AgendaJobRepository {
  constructor() {}
  async getAllSeatsInfo() {
    try {
      return  SeatsModel.find()
    } catch (e) {
throw e
    }
  }
  
  async getAvaialbleSeats() {
    try {
      const res=await SeatsModel.aggregate([
        {
          $match:{
            isBooked:false
          }
        },
        {
          $project:{
            _id:0,
            seatNo:1
          }
        }
      ])
      console.log(res)
      return res.map(ele=>ele.seatNo)
    } catch (e) {
     throw e
    }
  }
  async getBookedSeats() {
    try {
      const res=await SeatsModel.aggregate([
        {
          $match:{
            isBooked:true
          }
        },
        {
          $project:{
            _id:0,
            seatNo:1
          }
        }
      ])
      return res.map(ele=>ele.seatNo)
    } catch (e) {
      throw e
    }
  }
  async bookSeats(seatNos) {
    try {
      if(Math.min(...seatNos)<1 || Math.max(...seatNos)>80)
      return ErrorResponse(res, e);
      return await  SeatsModel.updateMany({seatNo:{$in:seatNos}},{isBooked:true})
    } catch (e) {
      throw e

    }
  }
}

module.exports = AgendaJobRepository;
