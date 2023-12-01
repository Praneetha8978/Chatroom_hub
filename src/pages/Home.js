import React from 'react';
import {Grid,Row,Col} from 'rsuite';
import Sidebar from '../components/Sidebar'
import '../styles/main.scss';
import { RoomsProvider } from '../context/rooms.context';

const Home = () => {
    return(
        <div >
           <RoomsProvider>
                <Grid fluid className='h-100'>
                    <Row className='h-100'>
                        <Col xs = {24} md = {8} className='h-100'>
                            <Sidebar/>
                        </Col>
                    </Row>
                </Grid>
           </RoomsProvider>
        </div>
    )
}

export default Home;