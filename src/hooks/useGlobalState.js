import { useContext } from 'react';
import { Context } from '../context/ContextComponent';

const useGlobalState = () => {
  const globalState = useContext(Context);

  return globalState;
};

export default useGlobalState;
