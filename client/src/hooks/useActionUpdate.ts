import { useState } from 'react';

const useActionUpdate = () => {
  const [, setActionUpdate] = useState(Math.random());
  return () => setActionUpdate(Math.random() * 100);
};

export { useActionUpdate };
