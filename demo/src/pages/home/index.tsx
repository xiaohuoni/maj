import { fakeAnalysisChartData } from '@/services/api';
import { useRequest } from 'ahooks';

function HomePage() {
  const { loading, data } = useRequest(fakeAnalysisChartData);
  console.log(data);
  return <div>Hello Mako!</div>;
}

export default HomePage;
