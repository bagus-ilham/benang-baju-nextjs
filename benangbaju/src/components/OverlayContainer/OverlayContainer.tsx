import Image from "next/image";
import { FC } from "react";
import styles from "./OverlayContainer.module.css";

type Props = {
  imgSrc: string;
  imgSrc2?: string;
  children?: React.ReactNode
};

const OverlayContainer: FC<Props> = ({ imgSrc, imgSrc2, children }) => (
  <div className={`${styles.imgContainer}`}>
    {imgSrc2 ? (
      <>
        <div className="hidden sm:block w-full">
          <Image
            className={styles.img}
            src={imgSrc}
            alt="tes1"
            width={858}
            height={414}
          />
        </div>
        <div className="block sm:hidden w-full">
          <Image
            className={styles.img}
            src={imgSrc2}
            alt="tes2"
            width={710}
            height={710}
          />
        </div>
      </>
    ) : (
      <Image
        className={styles.img}
        src={imgSrc}
        alt="tes3"
        width={710}
        height={710}
      />
    )}

    {children}
    <div className={styles.imgOverlay}></div>
    <div className={styles.overlayBorder}></div>
    <div className={styles.overlayBorder2}></div>
  </div>
);

export default OverlayContainer;
