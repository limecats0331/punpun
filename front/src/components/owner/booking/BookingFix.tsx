import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';
import BookingItem, { Booking } from '../../ui/BookingItem';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';

export interface BookingListProps {
  bookings: Booking[];
}

const BookingListContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0);
  border-radius: 20px;
  padding: 16px;
  margin: 0.5rem 1rem 1rem 0.5rem;
  max-width: 175px;
  width: 100%;
  height: 200px; */
  /* cursor: pointer; */
  /* perspective: 1000px; */
  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
`;

const NoBookingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  /* margin: 2rem 0; */
  /*  */
  width: 100%;
  height: 200px;
  border-radius: 20px;
  margin: 1rem 1rem 1rem 1rem;
  max-width: 300px;
  // border: 3px solid pink;
  padding: 16px;
`;

const BookingFix = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    API.get(`bookings/store/${selectedStore?.storeId}?state=END`)
      .then((response: any) => {
        // console.log(response.data.content);
        setBookings(response.data.content);
      })
      .catch((error: any) => {
      });
  }, []);

  const onSelect = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <BookingListContainer>
      {bookings.length === 0 ? (
        <NoBookingMessage>확정된 예약이 없습니다.</NoBookingMessage>
      ) : (
        bookings.map((booking) => (
          <BookingItem
            key={booking.reservationId}
            booking={booking}
            isActive={booking.reservationId === selectedId}
            onClick={() => onSelect(booking.reservationId)}
            isRequest={true}
          />
        ))
      )}
    </BookingListContainer>
  );
};

export default BookingFix;
