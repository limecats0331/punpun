import React, { useState } from 'react';
import styled from 'styled-components';
import MainComponent from '../../components/ui/MainComponent';
import Share from '../../components/owner/booking/Share';
import ShareList from '../../components/owner/booking/ShareList';
import Sidebar from '../../components/ui/Sidebar';
import BookingToday from '../../components/owner/booking/BookingToday';
import BookingList from '../../components/owner/booking/BookingList';

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

function OwBookingPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  const menuItems = [
    { title: '오늘의 예약', component: () => <BookingToday /> },
    {
      title: '예약 목록',
      component: () => <BookingList />,
    },
    { title: '나눔 등록', component: () => <Share /> },
    { title: '나눔 목록', component: () => <ShareList /> },
  ];
  return (
    <ComponentStyle>
      <Sidebar
        title="예약 관리"
        menuItems={menuItems}
        currentMenuItemIndex={currentMenuItemIndex}
        setCurrentMenuItemIndex={setCurrentMenuItemIndex}
      />
      <MainComponent width={53.7}>
        {menuItems[currentMenuItemIndex].component()}
      </MainComponent>
    </ComponentStyle>
  );
}

export default OwBookingPage;
