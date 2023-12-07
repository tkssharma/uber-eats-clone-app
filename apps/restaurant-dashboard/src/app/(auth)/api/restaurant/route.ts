import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(authOptions);

  try {
    // fetch data from restaurant apis from proxy
    // GET SERVER SIDE SESSION AND PASS TOKEN TO NESTJS APIS
    const response = await axios.get(
      `http://localhost:3001/api/v1/restaurant-service/restaurants`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      }
    );
    const { data } = response;
    // we got data here successfully !!
    console.log(data);
    return new Response(JSON.stringify(data), { status: 200 });
    // return res.status(200).json(data)
  } catch (err) {
    console.log(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: NextApiRequest) {
  const session: any = await getServerSession(authOptions);

  try {
    const response = await axios.post(
      `http://localhost:3001/api/v1/restaurant-service/restaurants`,
      {
        name: "Kanha Veg Restaurant",
        description: "Veg Restaurant in North Goa",
        average_price: "1200",
        latitude: "11",
        longitude: "11",
        contact_no: "8998978987",
        banner: "https://gogole.com/banner.png",
        delivery_options: "all",
        pickup_options: "all",
        opens_at: "2023-10-05T14:48:00.000Z",
        closes_at: "2023-10-05T14:48:00.000Z",
        address: {
          name: "Goan Restaurant",
          city: "Punjim",
          state: "Goa",
          street: "North Goa",
          pincode: "12001",
          country: "India",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      }
    );
    const { data } = response;
    // we got data here successfully !!
    console.log(data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
