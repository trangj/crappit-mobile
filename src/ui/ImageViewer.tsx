import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import ImageView from 'react-native-image-viewing';

interface ImageViewerProps {
  uri: string
}

function ImageViewer({ uri } : ImageViewerProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
      >
        <Image
          source={{ uri }}
          style={{ height: 300, width: '100%' }}
          resizeMode="cover"
        />
      </Pressable>
      <ImageView
        images={[{ uri }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </>
  );
}

export default ImageViewer;
