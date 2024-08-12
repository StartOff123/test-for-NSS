import { useSelector } from 'react-redux';

import { RootState } from '@redux/store';

// Хук useSelector с типизацией
export const useAppSelector = useSelector.withTypes<RootState>();
