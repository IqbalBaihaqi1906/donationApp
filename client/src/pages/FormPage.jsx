import React from 'react'

function FormPage() {
    return (
        <div className="flex justify-center items-center w-full bg-blue-200">
            <div className="w-5/6 md:w-2/3 bg-white rounded-md shadow-2xl p-8 m-4">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Donation Form</h1>
                <form>
                    <div className="flex flex-col mb-4">
                        <div className="absolute mt-11 ml-3 text-gray-500">$</div>
                        <label className="mb-2 font-bold text-lg text-gray-900" >Donation Amount <span className="text-red-400">*</span></label>
                        <input className="border-2 rounded-md border-green-300 py-2 px-3 pl-6 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">Error Message</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Email <span className="text-red-400">*</span></label>
                        <input className="border-2 rounded-md border-green-300 py-2 px-3 text-grey-800" type="email"/>
                        <p className="text-red-400 text-xs italic">Error Message</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Fullname <span className="text-red-400">*</span></label>
                        <input className="border-2 rounded-md border-green-300 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">Error Message</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >NRIC <span className="text-red-400">*</span></label>
                        <input className="border-2 rounded-md border-green-300 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">Error Message</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Phone Number</label>
                        <input className="border-2 rounded-md border-green-300 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">Error Message</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Address</label>
                        <textarea className="border-2 rounded-md border-green-300 py-2 px-3 text-grey-800" ></textarea>
                        <p className="text-red-400 text-xs italic">Error Message</p>
                    </div>

                    <button className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto px-6 py-2 rounded-lg" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default FormPage
