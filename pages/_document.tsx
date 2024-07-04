import { Html, Head, Main, NextScript } from "next/document";
import Layout from "./layout";

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Layout>
          <Main />
          <NextScript />
        </Layout>
      </body>
    </Html>
  );
}
