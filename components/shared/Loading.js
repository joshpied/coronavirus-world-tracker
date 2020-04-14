import styled from 'styled-components';

const LoadingContainer = styled.div`
  margin-top: 3em;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading {
    display: flex;
    flex-direction: row;
  }

  .loading__letter {
    font-weight: normal;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #fff;
    animation-name: bounce;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    40% {
      transform: translateY(-5px);
    }
    80%,
    100% {
      transform: translateY(0px);
    }
  }

  .loading__letter:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loading__letter:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loading__letter:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loading__letter:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loading__letter:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loading__letter:nth-child(7) {
    animation-delay: 0.6s;
  }
  .loading__letter:nth-child(8) {
    animation-delay: 0.8s;
  }
  .loading__letter:nth-child(9) {
    animation-delay: 1s;
  }
  .loading__letter:nth-child(10) {
    animation-delay: 1.2s;
  }
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <div className="loading">
        <div className="loading__letter">L</div>
        <div className="loading__letter">o</div>
        <div className="loading__letter">a</div>
        <div className="loading__letter">d</div>
        <div className="loading__letter">i</div>
        <div className="loading__letter">n</div>
        <div className="loading__letter">g</div>
        <div className="loading__letter">.</div>
        <div className="loading__letter">.</div>
        <div className="loading__letter">.</div>
      </div>
    </LoadingContainer>
  );
}
