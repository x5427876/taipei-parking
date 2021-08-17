import "./styles/index.css";
import distance from "./distance";
import twd97_to_latlng from './twd97tolatlng'

import { useDispatch } from "react-redux";
import { getParkLocationAsync, setLocation, getParkIdAsync } from './redux/travelSlice'
import Map from "./components/Map";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import List from "./components/List";


const App = () => {
  const [area, setArea] = useState('中正區')
  const [dist, setDist] = useState('close')
  const [isCheck, setIsCheck] = useState(true)
  const [centerLocation, setCenterLocation] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setLocation({ lat: latitude, lng: longitude }))
    });
    dispatch(getParkLocationAsync())
    dispatch(getParkIdAsync())
  }, [dispatch])
  console.log(centerLocation)

  const myLocaition = useSelector(state => state.location.myLocaition)
  const parkLocation = useSelector(state => state.location.location[0])
  const LocationId = useSelector(state => state.location.locationId[0])
  const locationAvailable = useSelector(state => state.location.locationAvailable[0])


  const renderMap = myLocaition.lng !== 0 && parkLocation
    ?.filter((station) => station.area === area && LocationId.indexOf(Number(station.id)) > 0)
    .filter((station) => isCheck ? locationAvailable[LocationId.indexOf(Number(station.id))].availablecar > 0 : true)



  return (
    <div className=''>
      <div className='h-20 flex justify-between items-center border-b border-gray-400'>
        <p className='font-bold text-4xl mx-4 text-blue-400'>台北停車通</p>
        <a href='#map' className='font-bold text-2xl mx-4 cursor-pointer hover:text-blue-400 lg:hidden'>看地圖</a>
      </div>
      <div className='grid grid-cols-4'>
        <div className='col-span-4 lg:col-start-1 lg:col-end-2 '>
          <div className='flex justify-around items-center my-2 px-3'>
            <div>
              <label className='text-gray-900 font-bold  whitespace-nowrap'>行政區 </label>
              <select className='bg-gray-200 opacity-80 ' onChange={(e) => { setArea(e.target.value) }}>
                <option value='中正區'>中正區</option>
                <option value='大同區'>大同區</option>
                <option value='中山區'>中山區</option>
                <option value='松山區'>松山區</option>
                <option value='大安區'>大安區</option>
                <option value='萬華區'>萬華區</option>
                <option value='信義區'>信義區</option>
                <option value='士林區'>士林區</option>
                <option value='北投區'>北投區</option>
                <option value='內湖區'>內湖區</option>
                <option value='南港區'>南港區</option>
                <option value='文山區'>文山區</option>
              </select>
            </div>
            <div className='flex items-center'>
              <label className='text-gray-900 font-bold  whitespace-nowrap'>距離 </label>
              <select className='bg-gray-200 opacity-80 ' onChange={(e) => { setDist(e.target.value) }}>
                <option value='close'>近到遠</option>
                <option value='far'>遠到近</option>
              </select>
            </div>
            <div className='flex items-center'>
              <label htmlFor='onlyAvailavle' className='text-gray-900 font-bold  whitespace-nowrap'>僅顯示有位</label>
              <input type='checkbox' className='w-8 h-5' id='onlyAvailavle' checked={isCheck} onClick={() => { setIsCheck(!isCheck) }} />
            </div>
          </div>
          <div className='h-[86vh] overflow-auto'>
            {myLocaition.lng !== 0 && parkLocation
              ?.filter((station) => station.area === area && LocationId.indexOf(Number(station.id)) > 0)
              .filter((station) => isCheck ? locationAvailable[LocationId.indexOf(Number(station.id))].availablecar > 0 : true)
              .sort((a, b) => {
                const destinationA = twd97_to_latlng(a.tw97x, a.tw97y)
                const destinationB = twd97_to_latlng(b.tw97x, b.tw97y)
                if (dist === 'close') {
                  return (distance(myLocaition.lat, myLocaition.lng, destinationA.lat, destinationA.lng, 'K') - distance(myLocaition.lat, myLocaition.lng, destinationB.lat, destinationB.lng, 'K'))
                } else {
                  return (distance(myLocaition.lat, myLocaition.lng, destinationB.lat, destinationB.lng, 'K') - distance(myLocaition.lat, myLocaition.lng, destinationA.lat, destinationA.lng, 'K'))
                }
              })
              .map((station) => <List station={station} myLocaition={myLocaition} available={locationAvailable[LocationId.indexOf(Number(station.id))].availablecar} setCenterLocation={setCenterLocation} />)
            }
          </div>
        </div>
        <div id='map' className='col-start-1 col-end-5 lg:col-start-2 lg:col-end-5 h-[90vh] flex justify-center items-center'>
          {myLocaition.lng !== 0 && <Map renderMap={renderMap} centerLocation={centerLocation ? centerLocation : myLocaition} />}
        </div>
      </div >
    </div >

  );
};

export default App;
