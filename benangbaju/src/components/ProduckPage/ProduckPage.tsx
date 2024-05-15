"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ProductPageProps {
  product: typeData;
}

interface typeData {
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
}
const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    // console.log(product, "<<<<<<<<<")
  const [images, setImages] = useState({
    img1: product.images[0],
    img2: product.images[1],
    img3: product.images[2],
    img4: product.images[3]
  });

  const [activeImg, setActiveImage] = useState(images.img1);

  const [amount, setAmount] = useState(1);

  return (
    <>
      <section className="app-x-padding app-max-width w-full my-3 ">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <Image
              src={activeImg}
              width={500}
              height={500}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24">
              <Image
                src={images.img1}
                width={500}
                height={500}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img1)}
              />
              <Image
                src={images.img2}
                width={500}
                height={500}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img2)}
              />
              <Image
                src={images.img3}
                width={500}
                height={500}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img3)}
              />
              <Image
                src={images.img4}
                width={500}
                height={500}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img4)}
              />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                Special From BenangBaju
              </span>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            <p className="text-gray-700">
                {product.description}
            </p>
            <h6 className="text-2xl font-semibold">$ {product.price}</h6>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
