import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';

const MyProfile: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem('userData');
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []);
  return (
    <div className="userProfileContainer">
      <Header />
      {userData.map((user, index) => (
        <div className="userDetails" key={index}>
          <div className="name">Name: {user.name}</div>
          <div className="email">Email: {user.email}</div>
          <div className="address">
            Address: Street - {user.address.street}, Suite - {user.address.suite}, City -{' '}
            {user.address.city}, ZIP Code - {user.address.zipcode}
          </div>
          <div className="phone">Phone: {user.phone}</div>
          <div className="website">Website: {user.website}</div>
        </div>
      ))}
    </div>
  );
};

export default MyProfile;
