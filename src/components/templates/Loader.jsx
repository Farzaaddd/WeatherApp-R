import { TailSpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        paddingTop: "120px",
        paddingLeft: "400px",
      }}
    >
      <TailSpin height="100" width="100" color="#538ed5" ariaLabel="loading" />
    </div>
  );
}

export default Loader;