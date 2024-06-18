import { request } from '@alita/request';
import { useRequest } from 'ahooks';
export async function fakeAnalysisChartData(data: any): Promise<any> {
  return request(
    'https://proapi.azurewebsites.net/api/fake_analysis_chart_data?token%20=%20123',
    { data },
  );
}
function HomePage() {
  const { loading, data } = useRequest(fakeAnalysisChartData);
  console.log(data);
  return <div>Hello Mako!</div>;
}

export default HomePage;
