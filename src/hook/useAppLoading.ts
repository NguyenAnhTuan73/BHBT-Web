import { appAction } from '../reducer/appReducer';
import { useAppDispatch, useAppSelector } from './../app/hook';

export default function useAppLoading() {
	const isAppLoading = useAppSelector(state => state.app.isAppLoading);
	const dispatch = useAppDispatch();
	const setAppLoading = (loading: boolean) => {
		dispatch(appAction.setAppLoading(loading));
	};
	return [isAppLoading, setAppLoading] as const;
}
