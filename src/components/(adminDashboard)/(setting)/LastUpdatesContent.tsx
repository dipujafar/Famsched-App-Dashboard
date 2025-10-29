import React from 'react'
const updateData = [
    {
        date: "22-09-2023",
        data: "In today’s rapidly evolving world, the importance of education cannot be overstated. Technological advancements, global interconnectivity, and the proliferation of information demand that we continuously adapt and expand our understanding. An educated individual is better prepared to tackle these challenges, innovate, and drive progress. Moreover, education promotes equality and social justice, providing marginalized groups with the means to uplift themselves and break cycles of poverty."
    },
    {
        date: "28-09-2023",
        data: "The importance of education cannot be overstated. Technological advancements, global interconnectivity, and the proliferation of information demand that we continuously adapt and expand our understanding. An educated individual is better prepared to tackle these challenges, innovate, and drive progress. Moreover, education promotes equality and social justice, providing marginalized groups with the means to uplift themselves and break cycles of poverty."

    },
]

export default function LastUpdatesContent() {
    return (
        <div className='mt-5'>
            <h4 className='text-2xl font-semibold mb-2'>Last Updates</h4>
            <div className='space-y-3' >
                {
                    updateData?.map((item, index) => (
                        <div key={index} className='border rounded p-3'>
                            <h5 className='text-xl'>Data: {item?.date} </h5>
                            <p className='text-lg'>{item?.data}</p>
                        </div>


                    ))
                }
            </div>

        </div>
    )
}
