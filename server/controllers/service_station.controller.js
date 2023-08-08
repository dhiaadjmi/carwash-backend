const ServiceStation = require('../models/service_station.model');

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

    // Create a new instance of ServiceStation
    const newServiceStation = new ServiceStation({
      name,
      phones: {
        phone1: phones.phone1,
        phone2: phones.phone2,
      },
      email,
      photos,
      profile_photo,
      managers,
      queues: queues.map(queue => ({
        name: queue.name,
        queue_schedule: queue.queue_schedule,
        service: queue.service,
      })),
      state
    });

    // Save the new service station to the database
    const savedServiceStation = await newServiceStation.save();

    res.status(201).json(savedServiceStation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createServiceStation,
};