import zxcvbn from 'zxcvbn';
import { AddressType, Network as btcAddressNetwork, getAddressInfo, Network, validate } from 'bitcoin-address-validation';
import { NetworkType } from '@orangecryptohq/orangeseed';

export const validatePasswordStrength = (password) => {
  const result = zxcvbn(password);
  const score = result.score;

  let strengthMessage = '';

  if (password.length < 10) {
    strengthMessage = 'Weak password';
  } else if (score < 2) {
    strengthMessage = 'Weak password';
  } else {
    strengthMessage = 'Strong password';
  }

  const feedback = result.feedback.suggestions.join(' ');

  return { strengthMessage, feedback, score };
};
export function validateBtcAddress({ btcAddress, network }: { btcAddress: string; network: NetworkType }): boolean {
  const btcNetwork = network === 'Mainnet' ? btcAddressNetwork.mainnet : btcAddressNetwork.testnet;
  try {
    return validate(btcAddress, btcNetwork);
  } catch (error) {
    return false;
  }
}
