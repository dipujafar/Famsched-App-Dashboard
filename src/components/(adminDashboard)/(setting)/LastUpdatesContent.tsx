import moment from 'moment'
import React from 'react'


export default function LastUpdatesContent({ data }: any) {
    return (
        <div className='mt-5'>
            <h4 className='text-2xl font-semibold mb-2'>Last Updates</h4>
            <div className='space-y-3' >
                {
                    data?.slice(0, 19)?.map((item: any, index: number) => (
                        <div key={index} className='border rounded p-3'>
                            <h5 className='text-xl font-medium'>Date:  {moment(data?.updatedAt).format("ll")} </h5>
                            <div className='flex flex-col lg:flex-row lg:gap-4 gap-2 mt-2'>
                                <div className='flex-1 border-r'>
                                    <h4 className='text-lg font-medium'>Old Content :</h4>
                                    <p dangerouslySetInnerHTML={{ __html: item?.oldValue }} />
                                </div>
                                <div className='flex-1'>
                                    <h4 className='text-lg font-medium'>New Content</h4>
                                    <p dangerouslySetInnerHTML={{ __html: item?.newValue }} />
                                </div>
                            </div>
                            <p className='text-lg'>{item?.data}</p>
                        </div>


                    ))
                }
            </div>

        </div>
    )
}
