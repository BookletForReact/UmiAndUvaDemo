
import LeftPanel from './components/leftPanel'
import RightPanel from './components/rightPanel'
import styles from  './index.scss';

function Main(props) {
  return (
    <div className={`${styles.mainWrapper} ${'box-sizing'}`}>
      <LeftPanel>
      </LeftPanel>
      <RightPanel></RightPanel>
    </div>
  );
}

export default Main
