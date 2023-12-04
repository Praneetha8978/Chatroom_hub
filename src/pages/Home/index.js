import React,{useState,useEffect} from 'react';
import {Grid,Row,Col} from 'rsuite';
import Sidebar from '../../components/Sidebar'
import '../../styles/main.scss';
import { RoomsProvider } from '../../context/rooms.context';
import { Routes,Route,useMatch,useLocation } from 'react-router-dom';
import Chat from './Chat';

const Home = () => {
    const { pathname } = useLocation();
    const match = useMatch('/chat/:chatId');
    const isExact = match ? pathname === match.pathname : false;
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Adjust the threshold as needed

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Adjust the threshold as needed
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    console.log("desktop"+" "+isDesktop);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    const canRenderSidebar = isDesktop || isExact;

    return(
        <div >
           <RoomsProvider>
                <Grid fluid className='h-100'>
                    <Row className='h-100'>
                        {canRenderSidebar &&
                            (<Col xs = {24} md = {8} className='h-100'>
                                <Sidebar/>
                            </Col>
                        )}
                        <Routes>
                            <Route path='/chat/:chatId' element={
                                <React.Fragment>
                                    <Col xs={24} md={16} className='h-100'>
                                        {console.log("hello in chat application")}
                                        <Chat />
                                    </Col>
                                </React.Fragment>
                            }/>
                            <Route path='/' element={
                                <React.Fragment>
                                    {
                                        isDesktop && (<Col xs = {24} md = {16} className='h-100'>
                                            <h6 className='text-center mt-page'>Please Select Chat</h6>
                                        </Col>
                                    )}
                                </React.Fragment>
                            }/>
                        </Routes>

                    </Row>
                </Grid>
           </RoomsProvider>
        </div>
    )
}

export default Home;