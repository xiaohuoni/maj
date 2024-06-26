import { useRequest } from 'ahooks';
import { Button } from 'antd-mobile';
import { useState } from 'react';
import { fakeAnalysisChartData } from 'src/services/api';
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
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          count + 1
        </Button>
      </p>
      <p>request data: {JSON.stringify(data)}</p>
    </div>
  );
}

export default HomePage;
