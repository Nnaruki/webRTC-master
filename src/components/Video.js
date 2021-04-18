import React, { useRef, useState } from 'react';
import { Card ,
        CardActionArea ,
        CardActions ,
        CardContent ,
        Typography, 
      } from '@material-ui/core';

import AudioAnalyser from './AudioAnalyser';
import useDimensions from './books/useDimentions';
import VolumeButton from './VolumeButton';

const Video = ({ isLocal, name, videoRef, rtcClient }) => {
  const [muted,setMuted] = useState(rtcClient.initialAudioMuted);
  const refCard = useRef(null);
  const dimensionsCard = useDimensions(refCard);
  const refVolumeButton = useRef(null);
  const dimensionsVolumeButton = useDimensions(refVolumeButton);

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay
          muted={isLocal || muted}
          ref={videoRef}
          width={dimensionsCard.width}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <VolumeButton 
          isLocal={isLocal}
          muted={muted}
          refVolumeButton={refVolumeButton}
          rtcClient={rtcClient}
          setMuted={setMuted} 
        />
        {!muted && videoRef.current && videoRef.current.srcObject && (
          <AudioAnalyser 
            audio={videoRef.current.srcObject}
            width={dimensionsCard.width - dimensionsVolumeButton.width - 40}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default Video;