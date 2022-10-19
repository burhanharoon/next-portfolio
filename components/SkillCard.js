import React from 'react';

const SkillCard = ({ title = '', description = '', icon = <svg></svg> }) => {
  return (
    <div className='flex flex-col gap-2 shadow hover:shadow-lg p-5 rounded-xl border-2 border-gray-50 hover:border-blue-200 transition-all duration-200 ease-linear'>
      <div className='h-14 w-14 rounded-xl bg-blue-50 p-2 flex items-center justify-center'>
        {icon}
      </div>
      <h3 className='font-medium text-lg text-black'>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default SkillCard;
