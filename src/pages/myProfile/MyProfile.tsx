import React from 'react';

interface MyProfileProps {
  userData: any[];
}

const MyProfile: React.FC<MyProfileProps> = ({ userData }) => {
  return (
    <div className="userProfileContainer">
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