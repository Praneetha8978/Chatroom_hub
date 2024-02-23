import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import '../../styles/main.scss';
import { RoomsProvider } from '../../context/rooms.context';
import { Routes, Route, useMatch, useLocation } from 'react-router-dom';
import Chat from './Chat';

const Home = () => {
  const { pathname } = useLocation();
  const match = useMatch('/chat/:chatId');
  const isChatRoute = !!match;

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [canRenderSidebar, setCanRenderSidebar] = useState(isDesktop && isChatRoute);

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth > 768;
      setIsDesktop(newIsDesktop);
      setCanRenderSidebar(newIsDesktop && isChatRoute);
    };

    window.addEventListener('resize', handleResize);

    // Call handleResize once initially to set the correct state on component mount
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isChatRoute]); // Added isChatRoute to the dependency array

  return (
    <div>
      <RoomsProvider>
        <Grid fluid className='h-100'>
          <Row className='h-100'>
            {canRenderSidebar && (
              <Col xs={24} md={8} className='h-100'>
                <Sidebar />
              </Col>
            )}

            <Routes>
              <Route
                path='/chat/:chatId'
                element={
                  <Col xs={24} md={16} className='h-100'>
                    {console.log('hello in chat application')}
                    <Chat />
                  </Col>
                }
              />
              <Route
                path='/'
                element={
                  <Col xs={24} md={16} className='h-100'>
                    {isDesktop ? (
                      <h6 className='text-center mt-page'>Please Select Chat</h6>
                    ) : <Sidebar/>}
                  </Col>
                }
              />
            </Routes>
          </Row>
        </Grid>
      </RoomsProvider>
    </div>
  );
};

export default Home;
