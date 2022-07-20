import React from 'react'
import { Card, CardContent, CardMedia, Link, Typography, Divider } from '@mui/material';

function NewsArticle({ article }) {
  const event = new Date(article.publishedAt);
  const date = new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeStyle: 'short' }).format(event);
  return (
    <Card sx={{ maxWidth: 345, minHeight: 600 }} variant="outlined">
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={article.urlToImage}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{
          minHeight: '128px'
        }}>
          {article.title}
        </Typography>
        <Typography variant='subtitle1' color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Divider sx={{ backgroundColor: '#dbdbdb' }} />
        <Typography variant="body1" gutterBottom>
          {article.description}
        </Typography>
        <Typography variant="body2" fontWeight='bold' gutterBottom>
          Source: {article.source.name}
        </Typography>
        <Link href={article.url} underline="hover" sx={{ color: '#191919' }}>Read More</Link>
      </CardContent>
    </Card>
  )
}

export default NewsArticle