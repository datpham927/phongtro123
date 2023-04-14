const services = require("../services/postServices");

const getAllPost = async (req, res) => {
  try {
    const { limit, page, areaNumber, priceNumber, ...query } = req.query;
    const response = await services.getAllPostService(
      Number(limit),
      Number(page),
      areaNumber,
      priceNumber,
      query
    );
    res.json(response);
  } catch (error) {
    res.json();
  }
};

const getNewPosts = async (req, res) => {
  try {
    const response = await services.getNewPosts();
    res.json(response);
  } catch (error) {
    res.json();
  }
};

const createNewPosts = async (req, res) => {
  try {
    const { address, title, description, images, priceNumber, imagesId,areaNumber } =
      req.body;
    const { id } = req.user;
    if (
      !id ||
      !address ||
      !title ||
      !description ||
      !images ||
      !priceNumber ||
      !areaNumber
    ) {
      return res.status(400).json({
        err: 1,
        message: "input required",
      });
    }
    const response = await services.createNewPosts(req.body, req.user);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};



const getApiPostAdmin = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        err: 1,
        message: "missing input",
      });
    }
    const response = await services.getAllPostAdmin(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId, overviewId, attributesId, labelCode, imagesId} =
      req.body;
      const userId = req.user.id;
    if (
      !userId||!postId|| !overviewId|| !attributesId|| !labelCode|| !imagesId
    ) {
      return res.status(400).json({
        err: 1,
        message: "input required",
      });
    }
    const response = await services.updatePost(req.body);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const deletePost=async(req,res)=>{
    try {
         const {postId} =req.query
         console.log(req.query)
         const {id}=req.user
         if(!postId||!id){
           return res.state(400).json({
            err:1,
            message:"Delete failed"
           })
         }
         const response = await services.deletePost(postId)
         return res.state(200).json(response)
    } catch (error) {
      res.json(error)
    }
}
const getDetailPost=async(req,res)=>{
  try {
       const {postId} =req.query

       if(!postId){
         return res.state(400).json({
          err:1,
          message:"Delete failed"
         })
       }
       const response = await services.getDetailPost(postId)
     res.json(response)
  } catch (error) {
    res.json(error)
  }
}


module.exports = { getAllPost, getNewPosts, createNewPosts, getApiPostAdmin,
                   updatePost ,deletePost,getDetailPost};
