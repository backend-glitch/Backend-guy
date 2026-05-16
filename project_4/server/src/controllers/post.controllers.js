import Post from "../models/post.models.js"

export const createPost = async(req,res) =>{
    
    try{
        const {title, content} = req.body;

        if(!title || !content) return res.status(400).json({message : "All fields are required"});

        const post = await Post.create({
            title,
            content,
            author : req.user.id
        });

        res.status(201).json({success : true,
            message : "Post created successfully",
            post
        });
    } catch(error){

        res.status(500).json({success : false,
            message : error.message
        })
    }
};


export const getPosts = async(req,res) => {
    try{

        // pagination
        const page  =parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const searchQuery = {
            title : {
                $regex : search,
                $options : "i"
            }
        };




        const posts = await Post.find(searchQuery).
        populate("author","name email")
        .skip(skip)
        .limit(limit)
        .sort({createdAt : -1})

        const totalPosts = await Post.countDocuments(searchQuery);


        res.status(200).json({success : true,
            currentPage : page,
            totalPages : Math.ceil(totalPosts/limit),
            totalPosts,
            posts

    });
    }catch(error){
       res.status(500).json({success : false, message : error.message})
    
    }
};

export const getPostbyID = async(req,res) =>{ 

    try{

        const post = await Post.findById(req.params.id).populate("author","name email");

        if(!post) return res.status(404).json("Post not Found");

        res.status(200).json({post});
    }catch(error){
        res.status(500).json({message : error.message})
    }
}

export const updatePost = async(req,res) => {

    try{

        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true});

         if(!post) return res.status(404).json("Post not Found");

         res.status(200).return({message : "post updated" ,post})
        
    }catch(error){
        res.status(500).json({message : "Post not Found"});
    }
}

export const deletePost = async(req,res) => {

    try{
        const post = await Post.findByIdAndDelete(req.params.id);

        if(!post) return res.status(404).json("Post not found.");

        //authorization
        if(post.author.toString !== req.user.id && req.user.role !== "admin") return escape.status(403).json({message : "access Denied"});

        //await post.deleteOne(); // causing error
        
        res.status(200).json({
            message : "post deleted successfully"
        })

    }catch(error){
      res.status(500).json({message : error.message});
    }
}
/*
export const getPost =(req,res) => {
    res.json({
        message : "ALL Postes Fetched"
    });
};
*/