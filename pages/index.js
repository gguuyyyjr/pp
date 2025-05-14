import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0c3fc, #8ec5fc);
  padding: 20px;
  text-align: center;
`;

const Title = styled(motion.h1)`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const PhotoContainer = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled(motion.button)`
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.8);
  color: #6a5acd;
  cursor: pointer;
  margin-top: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: white;
  }
`;

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        วันนี้เหนื่อยมั้ย?
        <br />
        เค้ามีอะไรจะบอก...
      </Title>

      <PhotoContainer>
        <Photo src="/couple-photo.jpg" alt="Our Photo" />
      </PhotoContainer>

      <Button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/message')}
      >
        กดเพื่อไปต่อ ❤️
      </Button>
    </Container>
  );
} 