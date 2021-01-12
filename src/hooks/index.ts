import {useMemo} from 'react';

export const useComponentWillMount = (func: () => unknown) => {
  useMemo(func, []);
};
