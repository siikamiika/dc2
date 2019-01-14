import React from 'react';
import withPersistentAwareness from './with-persistent-awareness';
import Adapter from './Adapter';
import Parser from './Parser';
import PopupMessageHandler from './PopupMessageHandler';
import Provider from './Provider';

const NetflixAdapter = {
  root: document.body,
  uniqueSelector: '.nfp.AkiraPlayer',
  value: (node) => {
    const captionWindow = document.querySelector('.player-timedtext');
    const video = document.querySelector('video');
    return {
      root: node,
      captionText: captionWindow ? captionWindow.textContent : null,
      video: video ? video : null
    };
  }
}

const ConnectedAdapter = withPersistentAwareness(Adapter, NetflixAdapter);

class App extends React.Component {
  render() {
    return (
      <ConnectedAdapter>
        {(adapter) => (
          <Parser>
            {(parser) => (
              <PopupMessageHandler>
                {(settings) => (
                  <Provider
                    adapter={adapter}
                    parser={parser}
                    settings={settings}>
                    {(currentCaptionToRender) => {
                      if (settings.isOn) {
                        return <div>{currentCaptionToRender}</div>
                      } else {
                        return null;
                      }
                    }}
                  </Provider>
                )}
              </PopupMessageHandler>
            )}
          </Parser>
        )}
      </ConnectedAdapter>
    );
  }
}

export default App;
