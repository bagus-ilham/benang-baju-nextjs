import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import ProductPage from '@/components/ProduckPage/ProduckPage'
import React from 'react'

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

interface ProductPageProps {
  product: typeData;
}

async function getProductBySlug({ params }: { params: { slug: string } }): Promise<typeData> {
  const slug = params.slug
  // console.log(slug, "ini slug")
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`, { cache: 'no-store' })
  // console.log(response.data)
  const data = await response.json()
  // console.log(data, "ini data")
  return data
}

const page = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlug({ params })
  // console.log(product, "<<<<<<<<<<<<<")
  return (
    <>
    <Header/>
    <ProductPage product={product}/>
    <Footer/>
    </>
  )
}

export default page