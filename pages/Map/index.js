// import { useState } from 'react';
// import ReactMapGL from 'react-map-gl';
// // import { dataLayer } from './map-style.js';

// import Layout from '../../components/Layout';

// export default function Map() {

//   const [viewport, setViewport] = useState({
//     width: '100vh',
//     height: '100vh',
//     // latitude: 37.7577,
//     // longitude: -122.4376,
//     zoom: 2.5
//   });

//   return (
//     <Layout>
//       <ReactMapGL
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//         mapboxApiAccessToken="pk.eyJ1Ijoiam9zaHBpZWQiLCJhIjoiY2s3eG9mbnJmMDBkajNkcXZjZ2p1cXFwaSJ9.XlbfqzBtF8Yl_B35js9zAw"
//         {...viewport}
//         onViewportChange={setViewport}
//       >

//         {/* <Source type="geojson" data={data}>
//         <Layer {...dataLayer} />
//       </Source> */}

//       </ReactMapGL>
//     </Layout>
//   );
// }


import React, { Component } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';

// import ControlPanel from './control-panel';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer
} from './layers';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9zaHBpZWQiLCJhIjoiY2s3eG9mbnJmMDBkajNkcXZjZ2p1cXFwaSJ9.XlbfqzBtF8Yl_B35js9zAw';

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 40.67,
      longitude: -103.59,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  };

  // _sourceRef = React.createRef();

  // _onViewportChange = viewport => this.setState({ viewport });

  // _onClick = event => {
  //   const feature = event.features[0];
  //   const clusterId = feature.properties.cluster_id;

  //   const mapboxSource = this._sourceRef.current.getSource();

  //   mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
  //     if (err) {
  //       return;
  //     }

  //     this._onViewportChange({
  //       ...this.state.viewport,
  //       longitude: feature.geometry.coordinates[0],
  //       latitude: feature.geometry.coordinates[1],
  //       zoom,
  //       transitionDuration: 500
  //     });
  //   });
  // };

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        // onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        // interactiveLayerIds={[clusterLayer.id]}
        // onClick={this._onClick}
      >
        {/* <Source
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={this._sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source> */}
        {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
      </MapGL>
    );
  }
}
