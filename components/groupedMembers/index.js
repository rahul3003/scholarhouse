import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const GroupedMembers = ({members}) => {

  return (
    <AvatarGroup max={4} sx={{marginTop:'20px', display:'flex' , justifyContent:'start', marginLeft:'5px'}}>
      {members?.map((member, id) => (
        <Avatar
          key={id}
          alt={member.details.name}
          src={member.details.photoURL}
        />
      ))}
    </AvatarGroup>
  );
};

export default GroupedMembers;