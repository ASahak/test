import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId  } from 'react-jss'
import {ServerStyleSheets} from '@material-ui/core/styles'

class HeadProduction extends Head {
    render() {
        const { head } = this.context._documentProps;
        const children = this.props.children;
        return (
            <head {...this.props}>
                {children}
                {head}
                {this.getCssLinks()}
            </head>
        );
    }
}

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const registry = new SheetsRegistry();
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;
        const generateId = createGenerateId();

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => (
                    sheets.collect(
                        <JssProvider registry={registry} generateId={generateId}>
                            <App {...props} />
                        </JssProvider>
                    )
                ),
            });
        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [
                // ...React.Children.toArray(initialProps.styles),
                <link rel="stylesheet" key={'linear'} href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" />,
                <link rel="stylesheet" key={'icons'} href="/static/styles/css/icons.css" />,
            ],
        }
    }

    render() {
        const isDev = process.env.NODE_ENV === 'development';

        return (
            <Html lang="en">
                {isDev ? <Head /> : <HeadProduction />}
                <body>
                    <Main />
                    {isDev && <NextScript />}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
