import React from "react";
import { useEffect, useState } from "react";
import { fetchImages, fetchImageUrls } from "../api/index";
import styles from './ImageCarousel.module.css';

const ImageCarousel = () => {

    const [images, setImages] = useState([]);
    const [imageIndex, setImagesIndex] = useState(0);

    useEffect(async () => {
        const fetchedImages = await fetchImages();
        setImages(fetchedImages);
    }, [])

    const nextImage = () => {
        if (!images.length) {
            return;
        }
        setImagesIndex((currentIndex) => {
            if (currentIndex === images.length - 1) {
                return 0;
            }
            return currentIndex + 1;
        })
    }

    const previousImage = () => {
        if (!images.length) {
            return;
        }
        setImagesIndex((currentIndex) => {
            if (currentIndex === 0) {
                return images.length - 1;
            }
            return currentIndex - 1;
        })
    }

    const getImages = () => {
        if (images.length) {
            return <img className={styles.img} src={images[imageIndex]} />
        }
        return <div>Loading ...</div>
    }

    return <div className={styles.container}>
        <button className={styles.btn} onClick={previousImage}>prev</button>
        <div className={styles.imageWrapper}>{getImages()}</div>
        <button className={styles.btn} onClick={nextImage}>next</button>
    </div>;
};
export default ImageCarousel;
