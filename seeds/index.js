const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})
// get random element in array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '60ca7c9ea3ea200f784f9aeb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, ducimus. Dignissimos ratione rem harum sunt, exercitationem quidem quam eius ipsa nemo dolor autem commodi odio quos? Quisquam nesciunt libero similique.',
            price: random1000,
            geometry:  { type : "Point", 
                        coordinates : [ 
                            cities[random1000].longitude,
                            cities[random1000].latitude
                        ]
                     },
            images:  [
                {
                  url: 'https://res.cloudinary.com/drq04sgqj/image/upload/v1623975877/YelpCamp/xzbgomtjt6rjyk08mfpf.jpg',
                  filename: 'YelpCamp/xzbgomtjt6rjyk08mfpf'
                },
                {
                  url: 'https://res.cloudinary.com/drq04sgqj/image/upload/v1623975878/YelpCamp/hnvozmi0iiwbttv7czpr.jpg',
                  filename: 'YelpCamp/hnvozmi0iiwbttv7czpr'
                }
              ],    
        })
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
});