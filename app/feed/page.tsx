'use client';
import React from 'react';
import Map from '@/components/ui/map';
import SideNav from '@/components/ui/sidenav';
import RecapCard from '@/components/ui/recapCard';

const MyMapPage: React.FC = () => {
    const first = { lat: 40.715894542723625, lng: -73.99163295995301 };
    const second = { lat: 40.681964285254374, lng: -74.00037204646198 };
    const zoom = 12.5;

    return (
        <div className='flex flex-row h-screen'>
            <div className='flex justify-center w-7/12'>
                <RecapCard />
            </div>
            <div className='flex bg-emerald-500 w-5/12'>
                <Map apiKey="AIzaSyDlIHh1Ww10Qdt20VJF3k4F-xojzHPZgfY" center={first} locations={[first, second]} zoom={zoom} />
            </div>
        </div>
    );
};

export default MyMapPage;
