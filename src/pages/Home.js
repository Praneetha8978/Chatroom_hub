import React from 'react';
import {Grid,Row,Col} from 'rsuite';
import Sidebar from '../components/Sidebar'

const Home = () => {
    return(
        <div>
           <Grid fluid className='h-100'>
                <Row>
                    <Col xs = {24} md = {8}>
                        <Sidebar/>
                        {/* Home.... */}
                    </Col>
                </Row>
           </Grid>
        </div>
    )
}

export default Home;