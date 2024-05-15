"use client";
import React, { FC, useState } from "react";
import backgroundImage from "/public/bg-img/curly_hair_girl-1.jpg";
import Link from "next/link";
import InputForm from "../Input/InputForm";
import { useRouter } from "next/navigation";

interface data {
  name: string;
  username: string;
  email: string;
  password: string;
}

const Register: FC = () => {
  const [data, setData] = useState<data>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

		const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const responseJSON = await response.json();
			console.log(responseJSON.message);
			router.push("/register?error=" + responseJSON.message);
		}

    router.push("/login")
  }
  return (
    <>
      <section
        className="w-full text-gray-900 py-36 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-start">
          <div className="flex justify-start">
            <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-black">
              <h2 className="text-2xl font-bold pb-5">Register</h2>
              <form>
                <InputForm
                  label="Name"
                  type="text"
                  id="name"
                  placeholder="Bagus Ilham"
                  value={data.name}
                  onChange={handleChange}
                />
                <InputForm
                  label="Username"
                  type="text"
                  id="username"
                  placeholder="bagusilham"
                  value={data.username}
                  onChange={handleChange}
                />
                <InputForm
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="bagus@index.co"
                  value={data.email}
                  onChange={handleChange}
                />
                <InputForm
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="*********"
                  value={data.password}
                  onChange={handleChange}
                />
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="submit"
                    className="text-black bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
                    onClick={(e)=> handleSubmit(e)}
                  >
                    Submit
                  </button>
                  <div className="flex items-center text-sm">
                    <p>Already have an account</p>
                    <Link href="/login">
                      <p className="underline cursor-pointer ml-1">Sign In</p>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
