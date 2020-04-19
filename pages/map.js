import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/map'), {
  ssr: false
});
const MapContainer = styled.main`
  margin-left: 5%;
  margin-right: 5%;
`;

export default function MapPage() {
  return (
    <MapContainer>
      <Map></Map>
    </MapContainer>
  );
}
