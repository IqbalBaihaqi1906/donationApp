

const donateController = {
    get : async (req,res,next) => {
        const SF = req.SF

        const data = await SF.sobject("Contact").find()
        res.status(200).json({
            data
        })
    }
}

module.exports = donateController