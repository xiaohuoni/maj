import { request } from '@alita/request';

export async function fakeAnalysisChartData(data: any): Promise<any> {
  return request(
    'https://proapi.azurewebsites.net/api/fake_analysis_chart_data?token%20=%20123',
    { data },
  );
}
