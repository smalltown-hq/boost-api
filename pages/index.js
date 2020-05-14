import GlobalStyles from "components/GlobalStyles";
import Button from "components/Button";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import Logo from "vectors/Logo";

export default function Home() {
  return (
    <>
      <div className="page">
        <Logo height={250} width={250} />
        <h1
          style={{ maxWidth: 500, textAlign: "center", paddingBottom: "1rem" }}
        >
          If you are looking for <a href="https://getboost.app">Boost</a> click
          below, we'll take you there!
        </h1>
        <a href="https://getboost.app" style={{ textDecoration: "none" }}>
          <Button>Take me to Boost</Button>
        </a>
      </div>
      <style jsx>{`
        .page {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <GlobalStyles />
    </>
  );
}
