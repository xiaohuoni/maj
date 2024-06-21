import { fakeAnalysisChartData } from '@/services/api';
import { useRequest } from 'ahooks';
import { useState } from 'react';
function HomePage() {
  const { loading, data } = useRequest(fakeAnalysisChartData);
  const [count, setCount] = useState(0);
  console.log(data);
  return (
    <div
      onClick={() => {
        setCount(count + 1);
      }}
    >
      Hello Mako!{count}
    </div>
  );
}

export default HomePage;
