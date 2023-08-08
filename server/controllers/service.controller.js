const Service = require('../models/service.model');

const createService = async (req, res) => {
  try {
    const { name, state, is_carwash } = req.body;

    // Create a new instance of Service
    const newService = new Service({
      name,
      state,
      is_carwash,
    });

    // Save the new service to the database
    const savedService = await newService.save();

    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllServices = async (req, res) => {
    try {
      const allServices = await Service.find();
  
      res.status(200).json(allServices);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong while fetching services.' });
    }
  };
  const getServiceById = async (req, res) => {
    try {
      const serviceId = req.params.id;
  
      // Find service by ID
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found.' });
      }
  
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the service.' });
    }
  };

  const deleteService = async (req, res) => {
    try {
      const serviceId = req.params.id;
  
      // Utiliser findByIdAndDelete pour rechercher et supprimer le service
      const deletedService = await Service.findByIdAndDelete(serviceId);
  
      // Vérifier si le service a été trouvé et supprimé
      if (!deletedService) {
        return res.status(404).json({ error: 'Service not found.' });
      }
  
      res.status(200).json({ message: 'Service deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the service.' });
    }
  };
  const updateService = async (req, res) => {
    try {
      const serviceId = req.params.id;
      const updates = req.body;
  
      // Vérifier si le service existe
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found.' });
      }
  
      // Mettre à jour les informations du service
      Object.assign(service, updates);
      await service.save();
  
      res.status(200).json({ message: 'Service information updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the service information.' });
    }
  };
  
module.exports = {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
  updateService,
};