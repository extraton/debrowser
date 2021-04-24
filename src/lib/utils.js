import BN from "bignumber.js";

export default {
  handleException(e, defaultMessage) {
    let message;
    const isObject = typeof e === 'object';
    const isObjectHasPropertyMessage = isObject && typeof e.message === 'string';
    if (isObjectHasPropertyMessage) {
      message = e.message;
    } else {
      console.error(e);
      message = defaultMessage;
    }
    return message;
  },
  convertNanoToView(amount, decimals, decimalPoints = 3) {
    const decimalPointsBn = BN(decimalPoints);
    const decimalsBn =  BN(decimals);
    const divisionBy = BN('10').exponentiatedBy(decimalsBn);
    const decimalPointsInFine = (decimalPointsBn.isGreaterThan(decimalsBn) ? decimalsBn : decimalPointsBn).toNumber();
    return BN(amount).dividedBy(divisionBy).toFormat(decimalPointsInFine, BN.ROUND_DOWN);
  },
}
