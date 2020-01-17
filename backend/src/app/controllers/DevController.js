const { ObjectId } = require('mongodb');

const api = require('../../services/api');

const Dev = require('../models/Dev');
const parseStringAsArray = require('../../utils/parseStringAsArray');
// index, show, store, update, destroy

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await api.get(`users/${github_username}`);
  
      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }    

    return res.json(dev);
  }

  async update(req, res) {
    const id = ObjectId(req.params.id);
    const { techs, latitude, longitude } = req.body;

    const { github_username } = await Dev.findById({ _id: id });

    const response = await api.get(`users/${github_username}`);

    const { name = login, avatar_url, bio } = response.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }     

    await Dev.findOneAndUpdate({ _id: id },{
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
    });
    
    const dev = await Dev.findById({ _id: id });

    return res.json(dev);
  }

  async destroy(req, res) {
    const id = ObjectId(req.params.id);
  
    await Dev.findByIdAndDelete({ _id: id });   
    
    return res.send();
  }
}




module.exports = new DevController();

