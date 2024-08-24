'use client'
import React, { useEffect, useState } from 'react';
import HeaderBox from '@/components/HeaderBox';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';


const Dashboard = () => {
  const [user, setUser] = useState(null); // State to hold the logged-in user data

 useEffect(() => {
  const fetchUserData = async () => {
    const userData = await getLoggedInUser();
   
    setUser(userData); // Set the fetched user data to state
  };

  fetchUserData();
}, []);

if (!user) {
  return <p>User not logged in or unable to fetch user data.</p>; // More informative fallback
}

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting" 
            title="Welcome"
            user={user?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.45}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSideBar
        user={user}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, { currentBalance: 600.90 }]}
      />
    </section>
  );
};

export default Dashboard;
