import moment from 'moment';
const formattedField = (data: any) => {
    switch (data) {
        case "price":
            return "Price";
        case "title":
            return "Title";
        case "maxMembers":
            return "Max Members";
        case "description":
            return "Description";
    }
}

export default function LastUpdates({ data }: any) {
    console.log(data);
    return (
        <div className='mt-5'>
            {data?.length > 0 &&  <h4 className='text-2xl font-semibold mb-2'>Last Updates</h4>}
            <div className='space-y-3' >
                {
                    data?.map((item: any, index: number) => (
                        <div key={index} className='border rounded p-3'>
                            <h5 className='text-xl'>Data: {moment(data?.updatedAt).format("ll")} </h5>
                            <div className='flex justify-between'>
                                <div className='flex-1 border-r px-1'>
                                    <p className='text-lg'>Old Values</p>
                                    {
                                        item?.updates?.map((item: any, index: number) => (
                                            <div key={index} className='grid grid-cols-2 mt-1'>
                                                <p>{formattedField(item?.field)} : {item?.oldValue}</p>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='flex-1 px-2'>
                                    <p className='text-lg'>New Values</p>
                                    {
                                        item?.updates?.map((item: any, index: number) => (
                                            <div key={index} className='grid grid-cols-2 mt-1'>
                                                <p>{formattedField(item?.field)} : {item?.newValue}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>


                    ))
                }
            </div>

        </div>
    )
}
