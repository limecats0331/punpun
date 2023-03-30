import React, { useState } from 'react';
import API from '../../store/API';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

// 로컬용 테스트 import (나중에 삭제)
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

import styled from 'styled-components';
import BookingModal from '../child/storedetail/BookingModal';
import { useRecoilValue } from 'recoil';
import { isChildState } from '../../store/atoms';
import { useRecoilState } from 'recoil';

interface MenuCardProps extends Menu {
  key: number;
  addToCart: (Item: Menu) => void;
}

type Menu = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

interface MenuCardImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  image: string;
}

const MenuCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 16px;
  max-width: 300px;
  cursor: pointer;
`;

const MenuCardImage = styled.div<MenuCardImageProps>`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 16px;
  background-image: url(${(props) => props.image})
  background-size: cover;
  background-position: center;
`;

const MenuCardTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const MenuCardPrice = styled.div`
  font-size: 14px;
  color: #666666;
`;

const HeartButtonWrapper = styled.div`
  margin-left: 190px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;



const MenuCard: React.FC<MenuCardProps> = ({ id, title, price, quantity, addToCart }) => {
  const [showModal, setShowModal] = useState(false);
  // const isChild = useRecoilValue(isChildState);
  const [isChild, setIsChild] = useRecoilState(isChildState);
  const [liked, setLiked] = useState(false);

  
  // 로컬용 테스트 코드
  const accessToken:any = Cookies.get('accessToken')
  const decodedToken: any = jwt_decode(accessToken);
  if ((decodedToken.role) === 'CHILD') {
    setIsChild(true)
  }

  const onClose = () => {
    setShowModal(false);
  };

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLiked(!liked);
    console.log('liked: ' + liked);

    const method = liked ? 'delete' : 'post';
    API[method]('favors', {id})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = () => {
    if (isChild) {
      // 어린이 회원일 때 클릭 이벤트
      setShowModal(true);
      console.log(isChild);
      console.log(id);
      
      
    } else {
      // 어른 회원일 때 클릭 이벤트
      addToCart({ id, title, price, quantity });
      console.log('Clicked as an adult');
    }
  };

  return (
    <>
      <MenuCardContainer>
        <div onClick={handleClick}>
          {/* <MenuCardImage image={image}> */}
            {isChild && (
              <HeartButtonWrapper>
                <button onClick={toggleLike}>{liked ? '💖' : '🖤'}</button>
              </HeartButtonWrapper>
            )}
          {/* </MenuCardImage> */}
          <div>
            <MenuCardTitle>{title}</MenuCardTitle>
            <MenuCardPrice>{price}원</MenuCardPrice>
          </div>
        </div>
      </MenuCardContainer>
      {showModal && isChild && (
        <BookingModal menu={{ id, title, price }} onClose={onClose} />
      )}
    </>
  );
};

export default MenuCard;
