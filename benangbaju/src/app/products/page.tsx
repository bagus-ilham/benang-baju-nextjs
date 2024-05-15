"use client";
import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface ResponseType {
  data: typeData[];
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

export default function Page() {
  const [currentItems, setCurrentItems] = useState<typeData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response: Response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const responseData: ResponseType = await response.json();
      if (responseData.data.length > 0) {
        setCurrentItems((prevItems) => [...prevItems, ...responseData.data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Header />
      <main id="main-content" className="-mt-20">
        {/* ===== Featured Products Section ===== */}
        <section className="app-max-width app-x-padding my-16 flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-3xl">Featured Products</h2>
          </div>
          <InfiniteScroll
            dataLength={currentItems.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more products to load</p>}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
              {currentItems.map((item: typeData) => {
                return <Card key={item._id} item={item} />;
              })}
            </div>
          </InfiniteScroll>
        </section>

        <div className="border-gray100 border-b-2"></div>
      </main>
      <Footer />
    </>
  );
}
