import { btcTransaction } from "@orangecryptohq/orangeseed";





1.)Generate transaction context
   btcTransaction.createTransactionContext()


   
State variables

  1.)transaction 
  btcTransaction.EnhancedTransaction
  2.)Summary 

  export type TransactionSummary = btcTransaction.TransactionSummary & {
    dustFiltered?: boolean;
  };

  Setting the states 

  1.)generateTxAndSummary -> generateTransaction




  After geting summary


  1.)summary.input - > getInputsWitAssetsFromUserAddress
  2.)summary.output - > getOutputsWithAssetsToUserAddress

  const inscriptionsFromPayment: btcTransaction.IOInscription[] = [];
  const satributesFromPayment: btcTransaction.IOSatribute[] = [];
  
  
  (isPartialTransaction ? inputFromPayment : outputsFromPayment).forEach((item) => {
    inscriptionsFromPayment.push(...item.inscriptions);
    satributesFromPayment.push(...item.satributes);
  });




