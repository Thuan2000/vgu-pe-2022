import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.Userback = window.Userback || {};
              Userback.access_token = '33613|62791|T63yQVODtngQUfihvnPPjw7Yk';
              (function(d) {
                  var s = d.createElement('script');s.async = true;
                  s.src = 'https://static.userback.io/widget/v1.js';
                  (d.head || d.body).appendChild(s);
              })(document);
            `,
          }}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
