import { Context, createContext, useState } from 'react';
import { merge } from 'lodash';
import LayoutSettings from '../components/Layout/LayoutSettings';

const SettingsContext = createContext({
  settings: LayoutSettings,
  updateSettings: (update?: {}) => {},
});

export const SettingsProvider: React.FC = ({
  // settings,
  children,
}) => {
  const [currentSettings, setCurrentSettings] = useState(
    // settings ||
    LayoutSettings
  );

  const handleUpdateSettings = (update = {}) => {
    const marged = merge({}, currentSettings, update);
    setCurrentSettings(marged);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
