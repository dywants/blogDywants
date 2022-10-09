/* eslint-disable prettier/prettier */
import React from 'react';
import styles from "./Author.module.scss"

const Author = ({author}) => {
    console.log(author)
    return (
        <div className={styles.wrapper}>
            <div className={styles.items}>
            {author.avatar && (
                <img
                  width={author.avatar.width}
                  height={author.avatar.height}
                  src={author.avatar.url}
                  alt="Author Avatar"
                  className={styles.avatar}
                />
              )}
              <div>
                <h4>{author.name}</h4>
                <p  dangerouslySetInnerHTML={{
                    __html: author.description,
                }}/>
              </div>
            </div>
        </div>
  );
};

export default Author;