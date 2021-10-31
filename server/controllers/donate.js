const donateController = {
    get : async (req,res,next) => {
        const SF = req.SF

        const data = await SF.sobject("Contact").find().select(["Name"])
        res.status(200).json({
            data
        })
    },
    create : async (req,res,next) => {
        try {
            const SF = req.SF
            const {donation,email,fullname,nric,phone_number,address} = req.body
            
            // Data Contact
            const contactData = {
                Email : email,
                LastName : fullname,
                Phone : phone_number,
                NRIC__c : nric,
                MailingStreet: address
            }

            // check email
            const isExist = await SF.sobject("Contact").find({Email : email})
                                    // .select(["Name","Email","])
            
            if (isExist.length === 0){

                // if email doesnt exist, create new contact
                const newContact = await SF.sobject("Contact")
                                            .create(contactData)
                
                if(!newContact.success){
                    return next({code:500, message:`Error while creating new contact, ${error.message}`})
                }
            }
            
            // get contact data
            const contactPerson = await SF.sobject("Contact").find({Email : email})
            // console.log(contactPerson)

            // create donation
            const date = new Date().toISOString()
            const donationData = {
                Donor_Name__c : contactPerson[0].Id,
                Donation_Amount__c : donation,
                Donation_Datetime__c : date
            }
            const newDonation = await SF.sobject("Donation__c").create(donationData)


            if(!newDonation.success){
                return next({code : 500, message:`Error at creating new donation ${error.message}`})
            }

            res.status(200).json({
                message : "Success",
                newDonation
            })
            console.log(success)

        } catch (error) {
            next({code : 500,message:`Error at create method ${error.message}`})
        }
    }
}

module.exports = donateController