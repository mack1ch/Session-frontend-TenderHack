import Image from "next/image";
import PPLogo from "../../../../../public/assets/logos/portalPostavchikov.svg";
export const PortalPostavchikovLogo = () => {
  return (
    <>
      <Image width={300} height={100} src={PPLogo} alt="Портал поставщиков" />
    </>
  );
};
