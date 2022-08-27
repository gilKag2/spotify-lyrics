import React from 'react';

export default function TrackSearchResult({ track, chooseTrack }) {
    const handlePlay = () => {
        chooseTrack(track);
    };
    return (
        <div className="d-flex m-2 align-items-center" style={{ cursor: 'pointer' }} onClick={handlePlay}>
            <img alt='err' src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
            <div className="m-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    );
}
