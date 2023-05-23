import Header from "@/components/header.component";

export default async function Home() {
  return (
    <>
      <Header />
      <section className="bg-gray-600 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
     
            <img className="w-full" src="https://res.cloudinary.com/practicaldev/image/fetch/s--OqC3V_dd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/igms4hmyimki3smwjq5u.png" />
          
        </div>
      </section>
    </>
  );
}
