import React from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import Link from 'next/link';
import {Container} from 'reactstrap';
import {
    Input,
} from '../../Shared/UI';

const Footer = (props) => {
    const styles = UseStyles();

    return (
        <footer>
           <Container className={styles['main-container_footer']}>
               <div>
                   <h4>Service</h4>
                   <Link href={'/'} prefetch={false}>
                        <a>Contact</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                        <a>FAQ</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                        <a>Algemene voorwaarden</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                        <a>Privacy & cookies</a>
                   </Link>
               </div>
               <div>
                   <h4>Adverteren</h4>
                   <Link href={'/'} prefetch={false}>
                       <a>Advertentieregels</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                       <a>Opvallen op Sexjobs</a>
                   </Link>
               </div>
               <div>
                   <h4>Raak betrokken</h4>
                   <Link href={'/'} prefetch={false}>
                       <a>Vrienden van</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                       <a>Testpanel</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                       <a>Feedback forum</a>
                   </Link>
               </div>
               <div>
                   <h4>Belangrijke informatie</h4>
                   <Link href={'/'} prefetch={false}>
                       <a>Stoppen met prostitutie</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                       <a>Veiligheid en Voorlichting</a>
                   </Link>
                   <Link href={'/'} prefetch={false}>
                       <a>Gedragscode & disclaimer</a>
                   </Link>
               </div>
               <div>
                   <h4>Nieuwsbrief</h4>
                   <p>Vul je e-mail adres in om onze nieuwsbrief te ontvangen:</p>
                   <form>
                       <Input
                           icon={{className: 'icon-arrow-right', onClick: () => void(1)}}
                           name="email"
                           type="email"
                           fullWidth={true}
                           placeholder="Email address"
                           size="md"/>
                   </form>
                   <p>We zullen je gegevens nooit delen.</p>
               </div>
           </Container>
        </footer>
    )
}
Footer.propTypes = {};
export default Footer;