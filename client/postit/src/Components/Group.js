import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Group = () => {
  const [groupName, setGroupName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_GROUP', payload: { groupName } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="md-form">
        <label htmlFor="groupName">Group Name</label>
        <input type="text" id="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Create Group</button>
    </form>
  );
};

export default Group;
