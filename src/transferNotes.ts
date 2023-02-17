// // https://github.com/AztecProtocol/aztec2-internal/blob/defi-bridge-project/end-to-end/src/sdk_utils.ts
import {
  AztecSdk,
  EthAddress,
  GrumpkinAddress,
  Signer,
  TxId,
  TxSettlementTime,
} from "@aztec/sdk";

export async function sendAsset(
  sender: GrumpkinAddress,
  recipient: GrumpkinAddress,
  tokenAddress: EthAddress,
  tokenQuantity: bigint,
  settlementTime: TxSettlementTime,
  sdk: AztecSdk,
  signer: Signer
) {
  const assetId = sdk.getAssetIdByAddress(tokenAddress);

  const tokenAssetValue = { assetId, value: tokenQuantity };

  const feeOptions = {
    userId: sender,
    userSpendingKeyRequired: true,
    excludePendingNotes: true,
    feeSignificantFigures: 2,
    assetValue: tokenAssetValue
  }

  const tokenTransferFeeNoOptions = (await sdk.getTransferFees(assetId))[settlementTime];
  const tokenTransferFee = (await sdk.getTransferFees(assetId, feeOptions))[settlementTime];

  console.log('tokenTransferFeeNoOptions: ', tokenTransferFeeNoOptions);
  console.log('transfer fee: ', tokenTransferFee);

  const tokenTransferController = sdk.createTransferController(
    sender,
    signer,
    tokenAssetValue,
    tokenTransferFee,
    recipient
  );
  // await tokenTransferController.createProof();
  // let txId = await tokenTransferController.send();
  // return txId;
}
