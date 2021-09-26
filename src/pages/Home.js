import Products from "../components/Products"


const Home = () => {
    return (
        <>
        <div>
            <div className="hero">
                <div className="container mx-auto px-60 flex items-center justify-between">
                    <div className="w-1/2">
                        <h6 className="text-lg"><em>Are you hungry ?</em></h6>
                        
                        <h1 className="text-3xl md:text-6xl font-bold">Don't Wait !</h1>

                        <button className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-green-400">Order Now</button>
                    </div>
                    <div className="w-1/2">
                        <img src="/images/pizzamain.svg" alt="" srcset="" className="w-4/5 ml-6" />
                    </div>
                </div>    
            </div>    
        </div>

        <div className="pb-24">
            <Products/>
        </div>
        </>
    )
}

export default Home
