import React from 'react'
import App from 'next/app';
import DefaultLayout from './_layouts/default';
import injectSheet from 'react-jss';
import 'bootstrap/dist/css/bootstrap.css';
import variables from '../static/styles/jss/variables';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../store/configureStore';

const style = {
    '@global': {
        'a': {
            textDecoration: 'none !important',
        },
        'body': {
            '@media (hover: none)': {
                paddingRight: '0px !important',
            }
        },
        'body, *': {
            margin: '0px',
            boxSizing: 'border-box',
            fontFamily: 'Arial',
        },
        'main': {
            flex: '1 0 auto',
            paddingTop: '16px',
            paddingBottom: '16px',
        },
        '#__next': {
            backgroundColor: variables.$bodyColor,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }
    }
};

class Layout extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        // Retrieving each page's props
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return {
            pageProps: pageProps,
        };
    }

    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const Layout = Component.Layout || DefaultLayout;
        return (
            <>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </Provider>
            </>
        );
    }
}

export function reportWebVitals(metric) {
    console.log(metric)
}

export default withRedux(createStore)(injectSheet(style)(Layout));