import React, {useState}  from 'react';
import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl"
const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1Ijoidmtvc3QiLCJhIjoiY2s4and4M3pwMDAxZzNybW42Y25ieGc0cCJ9.f6HBCu8LQjhxik2EN7E4pg'
});
export function HDYFMap(props)
{

    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '100vh',
                width: '100vw'
            }}
            center={[0, 0]}
            zoom={[1]}
        >
            <Layer type="symbol" id="marker" layout={{'icon-image': 'marker-15'}}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
            </Layer>
        </Map>
    )
}