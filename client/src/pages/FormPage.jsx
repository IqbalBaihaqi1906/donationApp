import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import "./style.css"
import axios from 'axios'
import Loading from '../components/loading/loading';

function FormPage() {
    const [formData,setFormData] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const [loading,setLoading] = useState(false)

    const history = useHistory()

    // Submit Handler
    const onSubmit = async (data) => {
        try {
            setFormData(data)
            setIsSubmit(true)
            console.log(formData)
            setLoading(true)
            const donate = await axios({
                method:"POST",
                url:"https://donationapp01.herokuapp.com/donate",
                data:data
            })
            localStorage.setItem("donated", "done");
            setLoading(false)
            history.push('/success')
        } catch (error) {
            console.log(error)
        }
    };

    // Custom Validation
    yup.addMethod(yup.string,"nric",function(msg){
        return this.test('test-nric',msg,function(str){
            if (str.length != 9) 
            return false;

        str = str.toUpperCase();

        var i, 
            icArray = [];
        for(i = 0; i < 9; i++) {
            icArray[i] = str.charAt(i);
        }

        icArray[1] = parseInt(icArray[1], 10) * 2;
        icArray[2] = parseInt(icArray[2], 10) * 7;
        icArray[3] = parseInt(icArray[3], 10) * 6;
        icArray[4] = parseInt(icArray[4], 10) * 5;
        icArray[5] = parseInt(icArray[5], 10) * 4;
        icArray[6] = parseInt(icArray[6], 10) * 3;
        icArray[7] = parseInt(icArray[7], 10) * 2;

        var weight = 0;
        for(i = 1; i < 8; i++) {
            weight += icArray[i];
        }

        var offset = (icArray[0] == "T" || icArray[0] == "G") ? 4:0;
        var temp = (offset + weight) % 11;

        var st = ["J","Z","I","H","G","F","E","D","C","B","A"];
        var fg = ["X","W","U","T","R","Q","P","N","M","L","K"];

        var theAlpha;
        if (icArray[0] == "S" || icArray[0] == "T") { theAlpha = st[temp]; }
        else if (icArray[0] == "F" || icArray[0] == "G") { theAlpha = fg[temp]; }

        return (icArray[8] === theAlpha);
        })
    })

    // Validation Schema
    const donationSchema = yup.object({
        donation : yup.number().required().min(10,"Minimal amount of donation is $10"),
        email : yup.string().email("Email Format Is Not Valid").required(),
        fullname : yup.string().matches(/^[a-zA-Z\s]+$/,"can only contain alphabet characters").required(),
        nric : yup.string().required().nric("NRIC is not valid"),
        address : yup.string(),
        phone_number : yup.string().min(10).matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,"Your phone number is not valid")
        
    })

    const { register, watch, handleSubmit, formState:{ errors } } = useForm({resolver: yupResolver(donationSchema)});

    let input = watch()

    return (
        <div className="flex bg-page justify-center items-center w-full">
            <div className="w-5/6 md:w-3/4 bg-gray-100 box rounded-md shadow-2xl p-8 m-4">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Donation Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-4">
                        <div className="absolute mt-11 ml-3 text-gray-500">$</div>
                        <label className="mb-2 font-bold text-md text-gray-900" >Donation Amount <span className="text-red-400">*</span></label>
                        <input {...register("donation")} className="border-2 rounded-md border-gray-400 py-2 px-3 pl-6 text-grey-800" min="1" type="number" />
                        <p className="text-red-400 text-xs italic">{input.donation || isSubmit ? errors.donation?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-md text-gray-900" >Email <span className="text-red-400">*</span></label>
                        <input {...register("email")} className="border-2 rounded-md border-gray-400 py-2 px-3 text-grey-800" type="email"/>
                        <p className="text-red-400 text-xs italic">{input.email || isSubmit ? errors.email?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-md text-gray-900" >Fullname <span className="text-red-400">*</span></label>
                        <input {...register("fullname")} className="border-2 rounded-md border-gray-400 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">{input.fullname || isSubmit ? errors.fullname?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-md text-gray-900" >NRIC <span className="text-red-400">*</span></label>
                        <input {...register("nric")} className="border-2 rounded-md border-gray-400 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">{input.nric || isSubmit ? errors.nric?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-md text-gray-900" >Phone Number</label>
                        <input {...register("phone_number")} className="border-2 rounded-md border-gray-400 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">{input.phone_number || isSubmit ? errors.phone_number?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-md text-gray-900" >Address</label>
                        <textarea {...register("address")} className="border-2 rounded-md border-gray-400 py-2 px-3 text-grey-800" ></textarea>
                        <p className="text-red-400 text-xs italic">{input.address || isSubmit ? errors.address?.message : null}</p>
                    </div>

                    <div className="flex justify-end w-full mt-12">
                        <button onClick={() => setIsSubmit(true)} className="bg-green-600 hover:bg-green-700 text-white font-semibold uppercase text-lg px-10 py-2 rounded-lg" type="submit">Submit</button>
                    </div>

                </form>
            </div>
            {loading ? <Loading/> : null}
        </div>
    )
}

export default FormPage
