import "../styles/picture.scss";

const Picture: React.FC<{ src: string | undefined; onClose: any }> = ({
  src,
  onClose,
}) => {
  const s = process.env.PUBLIC_URL + "/img/" + src;
  return (
    <div className="Picture">
      <img src={s} />
      <div className="back" onClick={onClose}>
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1120"
          width="18"
          height="18"
        >
          <path
            d="M348.049462 511.986697l405.637554-386.277624c14.462387-13.740956 14.462387-36.07359 0-49.842175-14.462387-13.767562-37.889959-13.767562-52.350298 0L270.312984 486.34469c-7.427156 7.071046-11.029194 16.393365-10.828626 25.654286-0.201591 9.261944 3.400446 18.584264 10.828626 25.65531l431.051363 410.476769c7.228635 6.884804 16.700357 10.327206 26.148543 10.327206 9.469676 0 18.943444-3.442402 26.174126-10.327206 14.462387-13.766538 14.462387-36.07359 0-49.841152L348.049462 511.986697z"
            p-id="1121"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Picture;
