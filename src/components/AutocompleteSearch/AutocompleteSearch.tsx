import React from 'react';
import { Autocomplete, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShows, setSearchTerm } from '../../app/showsSlice';
import { RootState, AppDispatch } from '../../app/store';
import { Link } from 'react-router-dom';

interface Show {
  id: number;
  name: string;
  premiered: string;
  summary: string;
  image?: { original: string };
}

const AutocompleteSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchShows = useSelector((state: RootState) => state.shows.searchShows);
  const isLoading = useSelector((state: RootState) => state.shows.isLoading);
  const error = useSelector((state: RootState) => state.shows.error);
  const searchTerm = useSelector((state: RootState) => state.shows.searchTerm);

  const handleInputChange = (_event: React.SyntheticEvent<Element, Event>, value: string) => {
    dispatch(setSearchTerm(value));
    if (value) {
      dispatch(fetchShows(value));
    }
  };

  const handleOptionSelect = (_event: React.SyntheticEvent, value: Show | null) => {
    console.log(value);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: '#333' }}>
        Search for TV Show
      </Typography>

      <Autocomplete
        value={null}
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        options={searchShows}
        getOptionLabel={(option: Show) => option.name}
        loading={isLoading}
        inputValue={searchTerm}
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
