import loadingIco from "../../assets/loading-black.gif";

export default function AuthLoading() {
  return (
    <div className="loading-screen">
      <img src={loadingIco} alt="Loading" width={"50px"} />
    </div>
  );
}
