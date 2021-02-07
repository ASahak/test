import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import AsideMenu from '../Components/Smart/AsideMenu';
import { NextSeo } from 'next-seo';

const Home = (props) => {

    return (
        <>
            <NextSeo
                title="Home"
                description="Some description"
            />
            <Container>
                <Row>
                    <Col xs={12} md={3}>
                        <AsideMenu />
                    </Col>
                    <Col xs={12} md={6}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto ea eligendi esse eveniet facere neque, nisi perspiciatis reiciendis similique sit tenetur totam. Cumque id minus nihil nulla odio rem.
                    </Col>
                </Row>
            </Container>
        </>
    )
}
Home.getInitialProps = async (props) => {
    const { isServer } = props.ctx;

    return { isServer };
};
export default Home;