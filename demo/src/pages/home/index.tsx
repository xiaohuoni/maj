import { fakeAnalysisChartData } from '@/services/api';
import { useRequest } from 'ahooks';
import { useState } from 'react';

function HomePage() {
  const { loading, data } = useRequest(fakeAnalysisChartData);
  const [count, setCount] = useState(0);
  console.log(data);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      Hello Mako!
      <p>count: {count}</p>
      <p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          count + 1
        </button>
      </p>
      <p>request data: {JSON.stringify(data)}</p>
    </div>
  );
}

export default HomePage;
