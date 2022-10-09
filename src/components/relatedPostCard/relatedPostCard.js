/* eslint-disable prettier/prettier */
import React from 'react';
import FeaturedImage from 'components/FeaturedImage';
import styles from './relatedPostCard.module.scss';

const relatedPostCard = ({title}) => {
    return (
        <div>
            <FeaturedImage className={styles.imageRelatedPost} />
            <h3
               className={styles.title}
               dangerouslySetInnerHTML={{
                __html: title,
              }}
           />
        </div>
    );
};

export default relatedPostCard;