const BusinessIdea = require("../models/BusinessIdea");

const ideaInfo = (obj) => {
  return {
    _id: obj._id,
    name: obj.name,
    objective: obj.objective,
    description: obj.description,
    weblink: obj.weblink,
    tags: obj.tags,
    owners: obj.owners,
    typeOfBusiness: obj.typeOfBusiness,
    views: obj.views,
    phoneNumber: obj.phoneNumber
  }
}

exports.createBusinessIdea = (req, res, next) => {
  const idea = new BusinessIdea({
    userId: req.data.investeeId
  });
  idea.save()
  .then(result => {
    res.status(201).json({
      message: "Idea created successfully!",
      result: ideaInfo(result)
    });
  })
  .catch(error => {
    res.status(404).json({
      message: error
    });
  });
}

exports.getBusinessIdea = (req, res, next) => {
  BusinessIdea.findOne({userId: req.data.investeeId})
	.then(BusinessIdea =>{
	   if(!BusinessIdea) {
	    return res.status(404).json({
	      message: "Object cannot be found"
	     });
	   }
	   return res.status(200).json({
	    result: ideaInfo(BusinessIdea),
	    message: "Object found"
	   });
	 })
	.catch(error => {
	  console.log(error);
	  return res.status(401).json({
	  	message: error
	  });
	});
}


exports.updateBusinessComments = (req, res, next) => {
  BusinessIdea.update (
    {_id : req.body._id},
    {
      $push: { messages: req.body.message}
  })
  .then(documents => {
    if(!documents) {
      return res.status(401).json({
        message: error
      });
    }
    res.status(200).json({
      message: "Updated BusinessIdea",
      result: ideaInfo(documents)
    });
  })
  .catch(error => {
    res.status(401).json({
      message: error
    });
  });
}

exports.updateBusinessIdea = (req, res, next) => {
  BusinessIdea.findOneAndUpdate (
    {userId : req.data.investeeId},
    {
      name: req.body.name,
      objective: req.body.objective,
      description: req.body.description,
      weblink: req.body.weblink,
      tags: req.body.tags,
      owners: req.body.owners,
      typeOfBusiness: req.body.typeOfBusiness
  })
  .then(documents => {
    if(!documents) {
      return res.status(401).json({
        message: error
      });
    }
    res.status(200).json({
      message: "Updated BusinessIdea",
      result: ideaInfo(documents)
    });
  })
  .catch(error => {
    res.status(401).json({
      message: error
    });
  });
}



exports.generateFeed = (req,res,next) => {
  BusinessIdea.find({}).limit(5)
    .then(result =>{
      if(!result){
        return res.status(404).json({
          message:"Users cannot be retrieved."
        });
      }
      else{
        res.status(201).json(result);
      }
  })
  .catch(error =>{
    res.status(401).json({
      message: error
    });
  });
}
