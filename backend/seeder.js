import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/UserModel.js";
import Order from "./models/OrderModel.js";
import Product from './models/ProductsModel.js';
import colors from 'colors';

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUser = await User.insertMany(users);

        const adminUser = createdUser[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        });

        const createdProduct = await Product.insertMany(sampleProducts);

        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

const destroyData = async () => {
    try {        
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        console.log('Data desctroyed'.red.inverse)
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}

