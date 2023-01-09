import loadingIco from "../assets/loading-black.gif"

export default function Loading() {
    return(
        <div className="loading-screen">
            <div className="content">
                <img src={loadingIco} alt="Loading" width={"50px"}/>
            </div>
        </div>
    )
}