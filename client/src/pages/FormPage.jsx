import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import "./style.css"

function FormPage() {
    const [formData,setFormData] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)

    const history = useHistory()

    // Submit Handler
    const onSubmit = async (data) => {
        try {
            setFormData(data)
            setIsSubmit(true)
            localStorage.setItem("donated", "done");
            history.push('/success')
        } catch (error) {
            console.log(error)
        }
    };

    // Validation Schema
    const donationSchema = yup.object({
        donation : yup.number().required().min(10,"Minimal amount of donation is $10"),
        email : yup.string().email("Email Format Is Not Valid").required(),
        fullname : yup.string().matches(/^[a-zA-Z\s]+$/,"can only contain alphabet characters").required(),
        nric : yup.string().required().matches(/^[GTSF]\d{7}[A-Z]$/,"NRIC format is not valid"),
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
        </div>
    )
}

export default FormPage
