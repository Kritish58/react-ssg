import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => {
   const [test, setTest] = React.useState('HELLO');
   return (
      <div>
         <h1>HELLO FROM JSX</h1>
      </div>
   );
};

ReactDOM.render(Home(), document.getElementById('root'));
