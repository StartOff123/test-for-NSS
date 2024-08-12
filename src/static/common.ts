import { GridColDef } from '@mui/x-data-grid';

// Колонки таблицы с репозиториями
export const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Название',
		flex: 1
	},
	{
		field: 'language',
		headerName: 'Язык',
		flex: 1
	},
	{
		field: 'forks_count',
		headerName: 'Число форков',
		flex: 1
	},
	{
		field: 'stargazers_count',
		headerName: 'Число звезд',
		flex: 1
	},
	{
		field: 'updated_at',
		headerName: 'Дата обновления',
		flex: 1
	}
];
