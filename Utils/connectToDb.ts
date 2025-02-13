import mongoose from 'mongoose'

const ConnectToDb = async() =>{

    try {
        // Checking if The Connection is Already Open or not
        if(mongoose.connection.readyState===1){
            // console.log('Already Connected')
            return
        }

        // if Not then
        if(process.env.MONGODB_URI){
            await mongoose.connect(process.env.MONGODB_URI)
            return
        }else{
            throw new Error('NO MONGODB_URI Defined')
        }


    } catch (error) {
        console.log(error)
    }

}

export default ConnectToDb