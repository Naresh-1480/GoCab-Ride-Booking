const captainModel = require("../models/captain.model");

const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("Please Enter All Fields");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname: firstname,
      lastname: lastname,
    },
    email,
    password,
    vehicle: {
      color: color,
      plate: plate,
      capacity: capacity,
      vehicleType: vehicleType,
    },
  });

  return captain;
};

module.exports = { createCaptain };
