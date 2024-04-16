import { useState } from 'react';
import styles from './app.module.css';

function App() {
  let [email, setEmail] = useState('');
  return (
    <div className={styles.App}>
      <form>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Почта"
          onChange={({ target }) => setEmail(target.value)}
        />
      </form>
    </div>
  );
}

export default App;
