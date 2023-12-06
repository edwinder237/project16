import React, { useEffect, useState } from 'react';
import { Transfer } from 'antd';
import {
  Button,
} from '@mui/material';

const TransferLists = ({ participants,handleSelectedParticipant }) => {
  const participantsList = participants.map((person, i) => ({
    key: i.toString(),
    title: `${person.firstName} ${person.lastName}`,
    description: person.role,
    chosen: false,
    metaData:person
  }));

  const [targetKeys, setTargetKeys] = useState([]);

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    const selectedParticipants = participantsList.filter((person) => newTargetKeys.includes(person.key));
    handleSelectedParticipant(selectedParticipants);
  };

  const reset = () => {
    setTargetKeys([]);
  };

  useEffect(() => {
    // Populate initial data
    const tempTargetKeys = participantsList.filter(person => person.chosen).map(person => person.key);
    setTargetKeys(tempTargetKeys);
  }, []);

  const renderFooter = (_, { direction }) => {
    return (
      <Button
        variant='contained'
        size="small"
        style={{
          float: direction === 'left' ? 'left' : 'right',
          margin: 5,
        }}
        onClick={reset}
      >
        Reset
      </Button>
    );
  };

  return (
    <Transfer
      operationStyle={{ backgroundColor: "" }}
      dataSource={participantsList}
      pagination={true}
      showSearch
      listStyle={{
        width: 300,
        height: 400,
        backgroundColor: "white"
      }}
      operations={['Enrol', 'Remove']}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => `${item.title}-${item.description}`}
      footer={renderFooter}
    />
  );
};

export default TransferLists;
