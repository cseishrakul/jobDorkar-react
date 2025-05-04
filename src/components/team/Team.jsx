import React from 'react';
import Title from '../../ui/Title';
import { users } from '../../constants';
import Member from './Member';

const Team = ({ darkMode }) => {
  return (
    <div
      className={`p-3 rounded-2xl flex-1 flex flex-col gap-5 transition-colors duration-300 ${
        darkMode ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-900'
      }`}
    >
      <Title darkMode={darkMode}>Team</Title>
      {users.map((user, index) => (
        <Member key={index} user={user} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default Team;
