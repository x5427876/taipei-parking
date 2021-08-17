import React from "react";
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import twd97tolatlng from '../twd97tolatlng'




export default function SimpleMap({ renderMap }) {
    const myLocation = useSelector(state => state.location.myLocaition)


    const MyLocationMaker = ({ text, color }) => (
        <div className='flex flex-col justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" class={`h-6 w-6 ${color === 'red' ? 'text-red-500' : 'text-black'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <div className='whitespace-nowrap font-bold text-lg bg-white border-black border-2 px-1'>
                {text}
            </div>
        </div>
    )

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDCEwHaQxqctjyiFPQKOfksUT6qMRVJWuU" }}
                defaultCenter={myLocation}
                defaultZoom={16}
            >
                <MyLocationMaker
                    lat={myLocation.lat}
                    lng={myLocation.lng}
                    text='我的位置'
                    color='red'
                />

                {renderMap?.map((station) => {
                    const location = twd97tolatlng(station.tw97x, station.tw97y)
                    return (
                        <MyLocationMaker
                            lat={location.lat}
                            lng={location.lng}
                            key={station.id}
                            text={station.name}
                        />
                    )
                })}
            </GoogleMapReact>
        </div>
    );
}