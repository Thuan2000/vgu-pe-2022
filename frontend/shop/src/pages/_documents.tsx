import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";

// Replace with the API keys from your widget installation page
const USERSNAP_GLOBAL_API_KEY = "d29420f8-4a66-4ff2-886f-ea64ed0c2d27";
const USERSNAP_API_KEY = "d3aa037f-24cb-4f5b-ad05-09a975e6cfe5";

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
          async
          src={`https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onUsersnapCXLoad = function(api) {
                // store the Usersnap global api on the window, if case you want to use it in other contexts
                window.Usersnap = api; 
                api.init();
                api.show('${USERSNAP_API_KEY}') 
            }         
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
