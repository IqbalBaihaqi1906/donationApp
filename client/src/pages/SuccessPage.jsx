import React from 'react'
import { useHistory } from 'react-router-dom'
import "./style.css"

function SuccessPage() {
    const history = useHistory()

    const donateAgain = () => {
        localStorage.removeItem('donated')
        history.push('/')
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-green-200">
            <div className="w-5/6 md:w-1/3 flex flex-col gap-y-2 items-center bg-gray-100 rounded-md shadow-2xl p-8 m-4">
                <div className="img">
                <i className="fas fa-check fa-7x"></i>
                </div>

                <h2 className="text-center uppercase font-semibold text-lg">
                    Thank you for your donation
                </h2>

                <h5 className="leading-loose">
                    Your Donation Has Been Submitted !
                </h5>

                <button onClick={donateAgain} type="button" className="bg-green-500 mt-6 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-green-600 transition duration-200 each-in-out">Donate Again</button>
            </div>
        </div>
    )
}

export default SuccessPage
