import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
import Script from "next/script";
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;

    if (process.env.NODE_ENV !== "production") {
      i18n!.reloadResources(locale);
    }

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            onLoad={() => {
              // @ts-ignore
              window.onUsersnapCXLoad = function (api) {
                api.init();
              };
              // @ts-ignore
              var script = document.createElement("script");
              // @ts-ignore
              script.defer = 1;
              script.src =
                "https://widget.usersnap.com/global/load/d29420f8-4a66-4ff2-886f-ea64ed0c2d27?onload=onUsersnapCXLoad";
              document.getElementsByTagName("head")[0].appendChild(script);
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
