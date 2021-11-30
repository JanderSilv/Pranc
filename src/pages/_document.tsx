/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable react/display-name */
import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from 'src/utils'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta name="theme-color" content="#025589" />
          <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicon/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicon/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicon/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicon/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicon/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicon/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicon/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/assets/favicon/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/assets/favicon/ms-icon-144x144.png"/>

          <meta property="og:title" content="PRANC" />
          <meta property="og:site_name" content="PRANC" />
          <meta property="og:description" content="Processo de auditoria NERC CIP" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:url" content="https://pranc.vercel.app/" />
          <meta property="og:image" content="/assets/images/og.png" />
          <meta property="og:image:width" content="581" />
          <meta property="og:image:height" content="180" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => props =>
        <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  }
}
