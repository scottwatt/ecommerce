import React from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselProductItem from '../CarouselProductItem';
import './JumbotronCarousel.css';

const JumbotronCarousel = ({ items }) => {
  return (
    <Carousel className="mb-4">
      {items.map((item) => (
        <Carousel.Item key={item._id} className="carousel-item-custom"
        >
          <CarouselProductItem {...item} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default JumbotronCarousel;

