import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Stack, TextField, Button, Grid, Container, Box, Divider } from '@mui/material';
import NewsArticle from './NewsArticle';
import Headlines from './Headlines';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function News() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('today');
  useEffect(() => {
    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=ROYQ4MgIWvG1rJLuTMt8QVCTG9PXw9eD`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.topic.value)
    setQuery(e.target.elements.topic.value);
  }
  console.log('data', data)

  return (
    <Container>
      {!md && <Headlines />}
      {!md && <Divider sx={{ backgroundColor: '#191919' }} />}
      <Box mb={4}>
      <form onSubmit={handleSubmit}>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', margin: '16px 0 16px 0' }}>
          <TextField size='small' label='Search for latest news' id='topic' type='text' fullWidth={md} />

          <Button type='submit' size='medium' variant='contained' disable disableElevation
            sx={{
              textTransform: 'none',
              backgroundColor: '#191919',
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#303030"
              }
            }}
          >Search</Button>
        </Stack>
      </form>
      {md && <Divider sx={{ backgroundColor: '#191919' }} />}
      </Box>
      <Grid container spacing={2}>
        {data ? data.response?.docs?.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article._id}>
          <NewsArticle article={article} />
        </Grid>
        ))
        : "Loading..."}
      </Grid>
    </Container>
  )
}

export default News