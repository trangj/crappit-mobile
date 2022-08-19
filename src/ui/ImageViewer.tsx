import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import ImageView from 'react-native-image-viewing';

interface ImageViewerProps {
  uri: string,
  name: string,
}

function ImageViewer({ uri, name } : ImageViewerProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
      >
        <Image
          source={{ uri: `https://crappit-development.imgix.net/${name}` }}
          style={{ height: 300, width: '100%' }}
          resizeMode="cover"
        />
      </Pressable>
      <ImageView
        images={[{ uri: `https://crappit-development.imgix.net/${name}` }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </>
  );
}

export default ImageViewer;
