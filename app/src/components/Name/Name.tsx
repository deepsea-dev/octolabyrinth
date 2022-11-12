import React, { useEffect, useState } from 'react';
import { HelloMessage } from '../../models/HelloMessage';
import { queryApi } from '../../wrappedFetch';
import { NameDisplayer } from './NameDisplayer';

export const Name: React.FC = () => {
  const [ourName, setOurName] = useState('unknown');

  useEffect(() => {
    queryApi<HelloMessage>('/api')
      .then(message => setOurName(message.message))
      .catch(e => console.log(e));
  }, []);

  return (
    <NameDisplayer name={ourName}/>
  );
};