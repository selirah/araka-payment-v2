import { WizardLayout } from '../components/WizardLayout';
import { Steps } from '../components/Steps';
import { Options } from '../components/Options';
import { Help } from '../components/Help';

const Pay = () => (
  <WizardLayout title="Araka | Payment">
    <Steps />
    <Options />
    <Help />
  </WizardLayout>
);

export default Pay;
