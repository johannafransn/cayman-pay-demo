import { StatusBar } from '../components/StatusBar';
import { Mark } from '../components/icons';
import { BRAND } from '../lib/brand';

interface Props {
  onPick: (role: 'worker' | 'owner') => void;
}

export const Login = ({ onPick }: Props) => (
  <div className="screen login">
    <StatusBar />
    <div className="loginhead">
      <div className="loginmark">
        <Mark color="#fff" />
      </div>
      <div className="loginbrand">{BRAND}</div>
      <div className="logintag">Get paid. Send money home.</div>
    </div>

    <div className="rolecards">
      <div className="rolelabel">Log in as</div>

      <button className="rolecard" onClick={() => onPick('worker')}>
        <div className="rc-em">👷</div>
        <div className="rc-body">
          <div className="rc-t">I'm a worker</div>
          <div className="rc-d">Get your pay and send money abroad</div>
        </div>
        <span className="rc-chev">›</span>
      </button>

      <button className="rolecard" onClick={() => onPick('owner')}>
        <div className="rc-em">🏗️</div>
        <div className="rc-body">
          <div className="rc-t">I'm a company owner</div>
          <div className="rc-d">Pay your team instantly, no wire fees</div>
        </div>
        <span className="rc-chev">›</span>
      </button>
    </div>

    <div className="logindemo">Demo · pick a role to explore. Nothing here is real.</div>
  </div>
);
