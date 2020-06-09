var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var seedDb=require("./seed.js");
seedDb();
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


// Campground.create({
//     name:"Granite Hill",
//     image:"https://q-cf.bstatic.com/images/hotel/max1024x768/227/227871385.jpg",
//     description:"Beautiful granite tops but no water!"
// },function(err,campground){
//     if(err){
//         console.log(err)
//     } else {
//         console.log("Successfully created");
//         console.log(campground);
//     }
// })
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log("Error")
        } else {
            res.render("index",{campgrounds:campgrounds});
        }
    });
})
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
})
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("shows", {campground:foundCampground});
        }
    })
})
app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground= {name:name, image:image,description:desc};
    Campground.create(newCampground,function(err,campgrounds){
        if(err){
            console.log("Error!")
        } else {
            console.log("Entered Successfully");
        }
    })
    res.redirect("/campgrounds");
})
app.listen(3000,function(){
    console.log("Server started at port 3000");
});