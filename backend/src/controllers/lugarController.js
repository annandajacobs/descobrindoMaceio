import Lugar from "../models/lugar.js";

export const listarLugares = async (req, res) => {
  const lugares = await Lugar.find();
  res.json(lugares);
};
