import React from 'react'

import distance from '../distance'
import twd97_to_latlng from '../twd97tolatlng'

const List = ({ station, myLocaition, available, setCenterLocation }) => {
    const destination = twd97_to_latlng(station.tw97x, station.tw97y)
    const howFar = distance(myLocaition.lat, myLocaition.lng, destination.lat, destination.lng, 'K')

    return (
        <div className='border my-4 bg-gray-100 mx-2 p-3 rounded-lg hover:bg-blue-200' onClick={() => { setCenterLocation({ lat: destination.lat, lng: destination.lng }) }}>
            <div class='flex justify-between'>
                <p className='text-xl font-bold'>{station.name}</p>
            </div>
            <p className='flex text-lg my-2 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {station.address ? station.address : '無資料'}
            </p>
            <p className='flex text-lg my-2 items-center justify-between'>
                <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {station.serviceTime === '00:00:00~23:59:59' ? '24H' : station.serviceTime}
                </div>
                <p className='font-bold'>剩餘車位: {available <= 0 ? '無車位' : available}</p>
            </p>
            <p className='flex justify-between'>
                <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {`距離: ${howFar.toFixed(2)} 公里`}
                </div>
                <a className='text-blue-600 font-bold' href={`https://www.google.com/maps/dir/?api=1&origin=${myLocaition.lat},${myLocaition.lng}&destination=${destination.lat},${destination.lng}&travelmode=driving`}>Google Map 導航</a>
            </p>
        </div>
    )
}

export default List
