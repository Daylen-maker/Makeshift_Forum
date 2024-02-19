import { SideToolbar } from './SideToolbar/SideToolbar';
import { TopToolbar } from './TopToolbar/TopToolbar';

export const Toolbar = ({ children }) => {
  return (
    <>
      <TopToolbar />
      <div className='content'>
        <SideToolbar />
        {children}
      </div>
    </>
  );
};
