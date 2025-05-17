import { useCallback, useState } from 'react';
import { BRC20ErrorCode, brc20TransferExecute, CoreError, ExecuteTransferProgressCodes, NetworkType, UTXO } from '@orangecryptohq/orangeseed';


type Props = {
  getSeedPhrase: () => Promise<string>;

  accountIndex: number;
  addressUtxos: UTXO[];
  tick: string;
  amount: number;
  revealAddress: string;
  changeAddress: string;
  recipientAddress: string;
  feeRate: number;
  network: NetworkType;
};

const useBrc20TransferExecute = (props: Props) => {
  const {
    getSeedPhrase,
    accountIndex,
    addressUtxos,
    tick,
    amount,
    revealAddress,
    changeAddress,
    recipientAddress,
    feeRate,
    network,
  } = props;
  const [running, setRunning] = useState(false);
  const [commitTransactionId, setCommitTransactionId] = useState<string | undefined>();
  const [revealTransactionId, setRevealTransactionId] = useState<string | undefined>();
  const [transferTransactionId, setTransferTransactionId] = useState<string | undefined>();
  const [progress, setProgress] = useState<ExecuteTransferProgressCodes | undefined>();
  const [errorCode, setErrorCode] = useState<BRC20ErrorCode | undefined>();

  const executeTransfer = useCallback(() => {
    if (running) return;

    const innerProps = {
      getSeedPhrase,
      accountIndex,
      addressUtxos,
      tick,
      amount,
      revealAddress,
      changeAddress,
      recipientAddress,
      feeRate,
      network,
    };

    setRunning(true);
    setErrorCode(undefined);
    setProgress(undefined);

    const runTransfer = async () => {
      try {
        const transferGenerator = await brc20TransferExecute(innerProps);
        let done = false;
        do {
          const itt = await transferGenerator.next();
          done = itt.done ?? false;

          if (done) {
            const result = itt.value as {
              revealTransactionId: string;
              commitTransactionId: string;
              transferTransactionId: string;
            };
            setCommitTransactionId(result.commitTransactionId);
            setRevealTransactionId(result.revealTransactionId);
            setTransferTransactionId(result.transferTransactionId);
            setProgress(undefined);
          } else {
            setProgress(itt.value as ExecuteTransferProgressCodes);
          }
        } while (!done);
      } catch (e) {
        if (CoreError.isCoreError(e)) {
          setErrorCode(e.code as BRC20ErrorCode);
        } else {
          setErrorCode(BRC20ErrorCode.SERVER_ERROR);
        }
      } finally {
        setRunning(false);
      }
    };

    runTransfer();
  }, [
    getSeedPhrase,
    accountIndex,
    addressUtxos,
    tick,
    amount,
    revealAddress,
    changeAddress,
    recipientAddress,
    feeRate,
    network,
    running,
  ]);

  return {
    executeTransfer,
    transferTransactionId,
    commitTransactionId,
    revealTransactionId,
    complete: !!transferTransactionId,
    progress,
    errorCode,
  };
};

export default useBrc20TransferExecute;