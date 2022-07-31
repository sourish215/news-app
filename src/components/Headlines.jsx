import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Typography, Box, Link } from '@mui/material';


function Headlines() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 0,
    easing: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesPerRow: 1
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=today&api-key=ROYQ4MgIWvG1rJLuTMt8QVCTG9PXw9eD`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  // console.log('headlines', data)

  return(
    <Box mt={2}>
      <Typography variant="h4" fontWeight='bold' align="center" gutterBottom color='#191919'>Today's top headlines</Typography>
        <Slider {...settings}>
            {data.response?.docs?.map((article) => (
                <div key={article._id}>
                  <Link href={article.web_url} underline='hover' style={{ cursor: 'pointer', color: '#000' }}>
                    <Typography variant="subtitle1" style={{ marginRight: '30px' }}>{article.headline.main}</Typography>
                  </Link>
                </div>
        ))}
        </Slider>
    </Box>
  );
}

export default Headlines