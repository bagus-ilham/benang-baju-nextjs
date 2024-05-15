import Link from "next/link";

import Button from "../Buttons/Button";
import Input from "../Input/Input";
import styles from "./Footer.module.css";
import IgLogo from "../../../public/icons/InstagramLogo";
import FacebookLogo from "../../../public/icons/FacebookLogo";

export default function Footer() {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
          <div>
            <h3 className={styles.footerHead}>Company</h3>
            <div className={styles.column}>
              <Link href="/example">about us</Link>
              <Link href="/example">contact us</Link>
              <Link href="/example">store location</Link>
              <Link href="/example">careers</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Help</h3>
            <div className={styles.column}>
              <Link href="/example">order tracking</Link>
              <Link href="/example">faqs</Link>
              <Link href="/example">privacy policy</Link>
              <Link href="/example">terms conditions</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Store</h3>
            <div className={styles.column}>
              <Link href="/example">women</Link>
              <Link href="/example">men</Link>
              <Link href="/example">bags</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Keep In Touch</h3>
            <div className={styles.column}>
              <span>
                details
                <br />
                address road
                <br />
                address city
              </span>
              <span>phone number</span>
              <span>
                Open All Days <br />- opening hours
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-16">
        <h4 className="text-3xl mb-4">newslatter</h4>
        <span className="px-6 text-center">newslatter desc</span>
        <div className="mt-5 px-6 flex w-full sm:w-auto flex-col sm:flex-row">
          <Input
            label="Newsletter Input Box"
            name="email"
            type="email"
            extraClass=" w-full sm:w-auto"
          />{" "}
          <Button
            size="lg"
            value=" "
            extraClass="ml-0 mt-4 sm:mt-0 tracking-widest sm:tracking-normal sm:mt-0 sm:ml-4 w-auto w-full sm:w-auto"
          />
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="app-max-width app-x-padding w-full flex justify-between">
          <span className="">@2024 Benangbaju. all rights reserved</span>
          <span className="flex items-center">
            <span className="hidden sm:block">follow us on social media:</span>{" "}
            <Link href="www.facebook.com" aria-label="Facebook Page">
              <FacebookLogo />
            </Link>
            <Link
              href="www.instagram.com"
              aria-label="Instagram"
            >
              <IgLogo />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
