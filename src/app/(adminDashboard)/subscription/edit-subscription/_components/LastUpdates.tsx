import React from 'react'
const updateData = [
    {
        date: "22-09-2023",
        field: [
            {
                cost: "5.00",
                planName: "Basic Plan",
            }
        ]

    },
    {
        date: "22-09-2023",
        field: [
            {
                cost: "5.00",
                planName: "Basic Plan",
            }
        ]

    },
]

export default function LastUpdates() {
    return (
        <div className='mt-5'>
            <h4 className='text-2xl font-semibold mb-2'>Last Updates</h4>
            <div className='space-y-3' >
                {
                    updateData?.map((item, index) => (
                        <div key={index} className='border rounded p-3'>
                            <h5 className='text-xl'>Data: {item?.date} </h5>
                            {
                                item?.field?.map((item, index) => (
                                    <div className='grid grid-cols-2 mt-1 text-lg'>
                                        <p>Plan Name: {item?.planName}</p>
                                        <p>Cost: ${item?.cost}</p>
                                    </div>
                                ))
                            }
                        </div>


                    ))
                }
            </div>

        </div>
    )
}
