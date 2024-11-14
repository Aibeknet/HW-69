import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AutocompleteSearch from './components/AutocompleteSearch/AutocompleteSearch';
import ShowInfo from './components/ShowInfo/ShowInfo';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TV Shows
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3 }}>
        <Routes>
          <Route path="/" element={<AutocompleteSearch />} />
          <Route path="/shows/:id" element={<ShowInfo />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
