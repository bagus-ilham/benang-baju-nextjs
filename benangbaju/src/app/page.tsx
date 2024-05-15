"use server";
import Button from "@/components/Buttons/Button";
import LinkButton from "@/components/Buttons/LinkButton";
import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Slideshow from "@/components/HeroSection/Slideshow";
import OverlayContainer from "@/components/OverlayContainer/OverlayContainer";
import TestiSlider from "@/components/TestiSlider/TestiSlider";
import Image from "next/image";
import Link from "next/link";

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

const fetchData = async () => {
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
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
export default async function Home() {
  const dataFetched = await fetchData();
  let currentItems = dataFetched?.data as typeData[];
  let isLoading: boolean = false;

  return (
    <>
      <Header />
      <Slideshow />

      <main id="main-content" className="-mt-20">
        {/* category */}
        <section className="w-full h-auto py-10 border border-b-2 border-gray100">
          <div className="app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full sm:col-span-2 lg:col-span-2">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage1.jpg"
                imgSrc2="/bg-img/banner_minipage1.jpg"
              >
                <LinkButton
                  href="/product-category/new-arrivals"
                  extraClass="absolute bottom-10-per sm:right-10-per z-20"
                >
                  New Arrivals
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className="w-full">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage2.jpg"
                imgSrc2="/bg-img/banner_minipage2.jpg"
              >
                <LinkButton
                  href="/product-category/women"
                  extraClass="absolute bottom-10-per z-20"
                >
                  Woman Collections
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className="w-full">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage3.jpg"
                imgSrc2="/bg-img/banner_minipage3.jpg"
              >
                <LinkButton
                  href="/product-category/men"
                  extraClass="absolute bottom-10-per z-20"
                >
                  Men Collections
                </LinkButton>
              </OverlayContainer>
            </div>
          </div>
        </section>

        {/* ===== Best Selling Section ===== */}
        <section className="app-max-width w-full h-full flex flex-col justify-center mt-16 mb-20">
          <div className="flex justify-center">
            <div className="w-3/4 sm:w-1/2 md:w-1/3 text-center mb-8">
              <h2 className="text-3xl mb-4">Best Selling</h2>
              <span>
                Here are some of our best selling products. Explore yourself in
                the latest trends.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding">
            {isLoading ? (
              <></>
            ) : (
              <>
                <Card key={currentItems[0]?._id} item={currentItems[0]} />
                <Card key={currentItems[1]?._id} item={currentItems[1]} />
                <Card key={currentItems[2]?._id} item={currentItems[2]} />
                <Card key={currentItems[3]?._id} item={currentItems[3]} />
              </>
            )}
          </div>
        </section>

        {/* ===== Testimonial Section ===== */}
        <section className="w-full hidden h-full py-16 md:flex flex-col items-center bg-lightgreen">
          <h2 className="text-3xl">Testimonial</h2>
          <TestiSlider />
        </section>
        

        {/* ===== Featured Products Section ===== */}
        <section className="app-max-width app-x-padding my-16 flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-3xl">Featured Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
            {currentItems.map((item, i) => {
              if (i >= 4 && i <= 13) {
                return <Card key={item._id} item={item} />;
              }
              return null;
            })}
          </div>
          <div className="flex justify-center">
            <Link href="/products">
              <Button value="see more" type="button"/>
              </Link>
          </div>
        </section>

        <div className="border-gray100 border-b-2"></div>

        {/* ===== Our Shop Section */}
        <section className="app-max-width mt-16 mb-20 flex flex-col justify-center items-center text-center">
          <div className="textBox w-3/4 md:w-2/4 lg:w-2/5 mb-6">
            <h2 className="text-3xl mb-6">Our Shop</h2>
            <span className="w-full">
              Stop by our stores to learn the stories behind our products, get a
              personal styling session, or shop the latest in person. See our
              store locations.
            </span>
          </div>
          <div className="w-full app-x-padding flex justify-center">
            <Image
              src="/bg-img/ourshop.png"
              alt="Our Shop"
              width={1000}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
