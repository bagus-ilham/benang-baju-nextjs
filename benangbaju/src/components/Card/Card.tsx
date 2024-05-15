"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Card.module.css";

type Props = {
  item: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  };
};

const Card: FC<Props> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWLHovered, setIsWLHovered] = useState(false);

  const {
    _id,
    name,
    slug,
    description,
    excerpt,
    price,
    tags,
    thumbnail,
    images,
    createdAt,
    updatedAt,
  } = item;

  const itemLink = `/products/${item.slug}`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link
          href={itemLink}
          tabIndex={-1}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered && (
            <Image
              className="w-full h-auto object-cover max-h-72 min-h-72"
              src={thumbnail}
              alt={name}
              width={230}
              height={300}
            />
          )}
          {isHovered && (
            <Image
              className="transition-transform transform hover:scale-110 duration-1000 w-full h-auto object-cover max-h-72 min-h-72"
              src={images[1]}
              alt={name}
              width={230}
              height={300}
            />
          )}
        </Link>
        <button
          type="button"
          className="absolute top-2 right-2 p-1 rounded-full"
          aria-label="Wishlist"
          onMouseOver={() => setIsWLHovered(true)}
          onMouseLeave={() => setIsWLHovered(false)}
        >
          {isWLHovered ? (
            <>
              <Image
                className="justify-center w-full h-auto"
                src="/icons/HeartSolid.svg"
                alt="Picture of the author"
                width={500}
                height={100}
              />{" "}
            </>
          ) : (
            <>
              <Image
                className="justify-center w-full h-auto"
                src="/icons/Heart.svg"
                alt="Picture of the author"
                width={500}
                height={100}
              />
            </>
          )}
        </button>
        <button type="button" className={styles.addBtn}>
          add to cart
        </button>
      </div>

      <div className="content">
        <Link href={itemLink} className={styles.itemName}>
          {name}
        </Link>
        <div className="text-gray400">Rp {price}</div>
        <button type="button" className="uppercase font-bold text-sm sm:hidden">
          add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
