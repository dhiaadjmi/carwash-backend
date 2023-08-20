const ServiceStation = require('../models/service_station.model');

// Contrôleur pour créer une nouvelle station de service
const createServiceStation = async (req, res) => {
  try {
    const {
      name,
      phones,
      email,
      photos,
      profile_photo,
      managers,
      queues,
      state
    } = req.body;

    const newServiceStation = new ServiceStation({
      name,
      phones,
      email,
      photos,
      profile_photo,
      managers,
      queues,
      state
    });

    const savedServiceStation = await newServiceStation.save();
    res.status(201).json(savedServiceStation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllServiceStations = async (req, res) => {
  try {
    const serviceStations = await ServiceStation.find();
    res.status(200).json(serviceStations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServiceStationById = async (req, res) => {
  const stationId = req.params.id;

  try {
    const serviceStation = await ServiceStation.findById(stationId);
    if (!serviceStation) {
      return res.status(404).json({ error: 'Service station not found.' });
    }
    res.status(200).json(serviceStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteServiceStation = async (req, res) => {
  const stationId = req.params.id;

  try {
    const deletedStation = await ServiceStation.findByIdAndDelete(stationId);
    if (!deletedStation) {
      return res.status(404).json({ error: 'Service station not found.' });
    }
    res.status(200).json({ message: 'Service station deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateServiceStation = async (req, res) => {
  const stationId = req.params.id;
  const updates = req.body;

  try {
    const updatedStation = await ServiceStation.findByIdAndUpdate(stationId, updates, { new: true });
    if (!updatedStation) {
      return res.status(404).json({ error: 'Service station not found.' });
    }
    res.status(200).json(updatedStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createServiceStation,
  getAllServiceStations,
  getServiceStationById,
  deleteServiceStation,
  updateServiceStation
  
};