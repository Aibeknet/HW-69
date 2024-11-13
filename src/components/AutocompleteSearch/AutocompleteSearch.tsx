// import React, { useState } from 'react';
// import { Autocomplete, TextField, Box, Typography, CircularProgress } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchShows } from '../../app/showsSlice';
// import { Link } from 'react-router-dom';
// import { RootState, AppDispatch } from '../../app/store';
//
// interface Show {
//   id: number;
//   name: string;
//   premiered: string;
//   summary: string;
//   image?: { original: string };
// }
//
// const AutocompleteSearch: React.FC = () => {
//   const [selectedShow, setSelectedShow] = useState<Show | null>(null);
//   const dispatch = useDispatch<AppDispatch>();
//   const searchShows = useSelector((state: RootState) => state.shows.searchShows);
//   const isLoading = useSelector((state: RootState) => state.shows.isLoading); // Используем isLoading
//   const error = useSelector((state: RootState) => state.shows.error);
//
//   const handleInputChange = (_event: React.SyntheticEvent<Element, Event>, value: string) => {
//     if (value) {
//       dispatch(fetchShows(value));
//     }
//   };
//
//
//   const handleOptionSelect = (_event: React.SyntheticEvent, value: Show | null) => {
//     setSelectedShow(value);
//   };
//
//   return (
//     <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
//       <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: '#333' }}>
//         Search TV Shows
//       </Typography>
//       <Autocomplete
//         value={selectedShow}
//         onInputChange={handleInputChange}
//         onChange={handleOptionSelect}
//         options={searchShows}
//         getOptionLabel={(option: Show) => option.name}
//         loading={isLoading}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Enter show name"
//             variant="outlined"
//             fullWidth
//             sx={{ marginBottom: 2 }}
//             InputLabelProps={{ shrink: true }}
//           />
//         )}
//         renderOption={(props, option: Show) => (
//           <li {...props} style={{ padding: '10px 20px', cursor: 'pointer' }}>
//             <Link to={`/shows/${option.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
//               {option.name}
//             </Link>
//           </li>
//         )}
//         isOptionEqualToValue={(option: Show, value: Show | null) => option.id === value?.id}
//       />
//       {isLoading && (
//         <Box sx={{ textAlign: 'center', paddingTop: 2 }}>
//           <CircularProgress />
//         </Box>
//       )}
//     </Box>
//   );
// };
//
// export default AutocompleteSearch;


import React, { useState } from 'react';
import { Autocomplete, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShows } from '../../app/showsSlice';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';

interface Show {
  id: number;
  name: string;
  premiered: string;
  summary: string;
  image?: { original: string };
}

const AutocompleteSearch: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const searchShows = useSelector((state: RootState) => state.shows.searchShows);
  const isLoading = useSelector((state: RootState) => state.shows.isLoading); // Используем isLoading
  const error = useSelector((state: RootState) => state.shows.error); // Проверяем error

  // Обработчик изменения текста
  const handleInputChange = (_event: React.SyntheticEvent<Element, Event>, value: string) => {
    if (value) {
      dispatch(fetchShows(value)); // Ищем шоу по введённому запросу
    }
  };

  // Обработчик выбора шоу из выпадающего списка
  const handleOptionSelect = (_event: React.SyntheticEvent, value: Show | null) => {
    setSelectedShow(value);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: '#333' }}>
        Search TV Shows
      </Typography>
      <Autocomplete
        value={selectedShow}
        onInputChange={handleInputChange} // Обработчик для изменения текста
        onChange={handleOptionSelect} // Обработчик для выбора шоу
        options={searchShows} // Массив доступных шоу
        getOptionLabel={(option: Show) => option.name} // Показываем название шоу
        loading={isLoading} // Показываем индикатор загрузки, если isLoading = true
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter show name"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
          />
        )}
        renderOption={(props, option: Show) => (
          <li {...props} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            <Link to={`/shows/${option.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
              {option.name}
            </Link>
          </li>
        )}
        isOptionEqualToValue={(option: Show, value: Show | null) => option.id === value?.id} // Проверка на равенство
      />

      {isLoading && (
        <Box sx={{ textAlign: 'center', paddingTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && !isLoading && (
        <Box sx={{ textAlign: 'center', paddingTop: 2 }}>
          <Typography variant="body1" color="error">
            Something went wrong. Please try again later.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AutocompleteSearch;
