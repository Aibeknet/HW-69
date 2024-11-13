import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowInfo, resetShowInfo } from '../../app/showsSlice';
import { Box, Typography, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
import { RootState, AppDispatch } from '../../app/store';
import AutocompleteSearch from '../AutocompleteSearch/AutocompleteSearch.tsx';

const ShowInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const showInfo = useSelector((state: RootState) => state.shows.showInfo);
  const isLoading = useSelector((state: RootState) => state.shows.isLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchShowInfo(Number(id)));
    }
    return () => {
      dispatch(resetShowInfo());
    };
  }, [id, dispatch]);

  if (isLoading || !showInfo) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', padding: 2, backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
      <AutocompleteSearch />

      <Typography variant="h3" align="center" sx={{ marginBottom: 3, color: '#333' }}>
        {showInfo.name}
      </Typography>

      <Card sx={{ display: 'flex', flexDirection: 'row', boxShadow: 2, borderRadius: '8px' }}>
        {showInfo.image?.original && (
          <CardMedia
            component="img"
            sx={{ width: 250, height: 300, margin: 2, objectFit: 'cover', borderRadius: '8px' }}
            image={showInfo.image.original}
            alt={showInfo.name}
          />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Premiered: {showInfo.premiered}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, color: '#555' }}>
              <div dangerouslySetInnerHTML={{ __html: showInfo.summary }} />
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/" sx={{ width: 'fit-content' }}>
              Back to Search
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ShowInfo;
