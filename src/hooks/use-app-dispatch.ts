import { useDispatch } from 'react-redux';

import { AppDispatch } from '@redux/store';

// Хук useDispatch с типизацией
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
