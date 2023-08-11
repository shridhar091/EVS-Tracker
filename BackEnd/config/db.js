const mongoose=require('mongoose')

const db=async()=>{
    try {
        const mongo=await mongoose.connect('mongodb://127.0.0.1:27017/EVs_Tracker')
        console.log(`db connected successfull`);
    } catch (error) {
        console.log(error);
    }
}

module.exports=db