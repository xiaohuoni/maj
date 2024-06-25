import { connect } from 'src/.maj/dva';
import { ConnectProps, HelloModelState } from 'src/.maj/dva/types';

interface AboutPageProps extends ConnectProps {
  hello: HelloModelState;
}
function AboutPage({ hello }: AboutPageProps) {
  return (
    <div>
      About Mako!
      <p>That pages state use dva</p>
      <p>Dva Data:{JSON.stringify(hello)}</p>
    </div>
  );
}

export default connect(({ hello }: { hello: HelloModelState }) => ({ hello }))(
  AboutPage,
);
