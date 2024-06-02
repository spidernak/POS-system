/* eslint-disable no-unused-vars */
// Home.jsx
import React from 'react';
import Login from './login';
import Category from '../component/Category';
import SideButton from '../component/sideButton';
import Navbar from '../component/navBar'

const Home = () => {
    return (
        <div className='flex w-full bg-homeBg'>
            <SideButton/>
            <div className='flex flex-col'>
                <Navbar/>
                <Category/>

            </div>
        </div>
    );
}

export default Home;
